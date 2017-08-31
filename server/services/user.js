/**
 * 用户信息业务操作
 */
const validator = require('validator')
const sha1 = require('sha1')
const request = require('request')
const Qs = require('qs')
const userAuthModel = require('./../models/user_auth')
const userInfoModel = require('./../models/user')
const userCode = require('./../codes/user')
const userToken = require('../utils/token/user_token')
const validateRules = require('../utils//regexp_rules') 
const config = require('../config/index')

/**
 * 检验用户注册数据
 * @param  {object} userInfo 用户注册数据
 * @return {object}          校验结果
 */
function validatorSignUp (userInfo) {
  let result = {
    success: false,
    message: ''
  }

  if (validateRules.username.test(userInfo.username) === false) {
    result.message = userCode.ERROR_USER_NAME
    return result
  }
  if (!validateRules.password.test(userInfo.password)) {
    result.message = userCode.ERROR_PASSWORD
    return result
  }
  if (userInfo.password !== userInfo.confirmPassword) {
    result.message = userCode.ERROR_PASSWORD_CONFORM
    return result
  }

  result.success = true
  return result
}

const user = {
  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn (formData) {
    let result = {
      success: false,
      message: ''
    }

    let data = await userAuthModel.getOneByIdentifierAndCredential({
      'identity_type': 'default',
      'identifier': formData.username,
      'credential': sha1(formData.password)
    })

    if (!data) {
      result.message = userCode.FAIL_USER_NO_EXIST
      return result
    }

    let userId = data.user_id
    result.success = true
    result.message = userCode.SUCCESS_SIGN_IN
    result.data = {
      token: userToken.createToken(userId),
      exp: 10
    }

    return result
  },

  /**
   * OAuth2.0 登录
   * @param {object} options 凭证类型、凭证 
   */
  async signInByOAuth (options) {
    let userId
    let data = await userAuthModel.getOneByIdentifier({
      'identity_type': options.identityType,
      'identifier': options.identifier
    })
    
    return data
  },

  /**
   * 注册用户
   * @param {object} options 
   */
  async signUp (options) {
    // 注册用户信息
    let signUpUser = await userInfoModel.create({
      username: options.username,
      email: options.email,
      avatar: options.avatar,
      introduction: options.introduction || '',
      github: options.github || ''
    })

    if (signUpUser) {
      // 注册用户权限
      let signUpUserAuth = await userAuthModel.create({
        user_id: signUpUser.insertId,
        identity_type: options.identity_type,
        identifier: options.identifier,
        credential: options.credential
      })

      if (signUpUserAuth) {
        return {
          user_id: signUpUser.insertId
        }
      } 
    }
    
    return false
  },

  /**
   * Github OAuth第三方登录
   * @param {string} code
   * @return {object} result 用户信息
   */
  async signInByGithub (code) {
    let result = {
      success: false,
      message: ''
    }
    if (typeof code === undefined || code === '') {
      // 获取code失败
      result.message = userCode.FAILED_GITHUB_OAUTH
      return result
    } else {
      let userId
      // 获取token
      let token = await this.getGithubToken(code)
      // 获取token失败
      if (!token) {
        result.message = userCode.FAILED_GITHUB_OAUTH
        return result
      }
      // 通过token获取用户信息
      let userInfo = await this.getUserInfoByGithub(token)
      // 验证登录
      let signInResult = await this.signInByOAuth({
        'identity_type': 'github',
        'identifier': userInfo.id
      })

      // 用户未注册
      if (!signInResult) {
        // 注册
        let signUpResult = await this.signUp({
          username: userInfo.name,
          avatar: userInfo.avatar_url,
          introduction: userInfo.bio,
          github: userInfo.html_url,
          identity_type: 'github',
          identifier: userInfo.id,
          credential: token
        })
        // 注册失败
        if (!signUpResult) {
          result.message = userCode.FAILED_GITHUB_OAUTH
          return result
        }
        userId = signUpResult.user_id
      } else{
        userId = signInResult.user_id
      }

      result.success = true
      result.data = {
        token: userToken.createToken(userId),
        exp: 10
      }
      return result
    }
  },
  /**
   * 获取Github基本信息
   * @param {string} code 
   * @return {promise} 请求对象
   */
  getGithubToken (code) {
    const github = config.github
    return new Promise((resolve, reject) => {
      request.post({
        url: github.oauth,
        form: {
          client_id: github.clientId,
          client_secret: github.clientSecret,
          code: code
        }
      }, function (err, httpResponse, body) {
        let token
        if (err) {
          console.error('github oauth failed:', error)
          reject()
        }

        if (body) {
          try {
            let tokenStr = body.split('&')[0]
            token = tokenStr.split('=')[1]
          } catch (e) {
            console.error('github oauth failed:', e)
            reject(e)    
          }
        }

        resolve(token)
      })
    })
  },

  /**
   * 获取Github基本信息
   * @param {string} token
   * @return {promise} 请求对象
   */
  getUserInfoByGithub (token) {
    const github = config.github
    return new Promise((resolve, reject) => {
      request.get({
        url: github.user,
        headers: {
          'User-Agent': 'request'
        },
        qs: {
          access_token: token
        }
      }, function (err, httpResponse, body) {
        if (err) {
          console.error('github oauth get user info failed:', error)
          reject(err)
        }
        let userInfo = JSON.parse(body)
        console.log('userInfo:', userInfo)
        resolve(userInfo)
      })
    })
  },

  
  /**
   * 根据用户ID查找用户业务操作
   * @param  {string} userId 用户ID
   * @return {object} 查找结果
   */
  async getUserInfoById (userId) {
    let result = {
      success: false,
      message: ''
    }

    let data = await userInfoModel.getUserInfoById(userId)
    const roleMap = [
      {value: 1, name: 'admin'},
      {value: 2, name: 'user'}
    ]

    if (data) {
      result.success = true
      result.message = userCode.SUCCESS_USER_INFO_READ
      roleMap.forEach((item) => {
        if (data.role === +item.value) {
          data.role = item.name
          return
        }
      })
      result.data = data
    } else {
      result.message = userCode.FAILED_USER_INFO_READ
    }

    return result
  },

  /**
   * 根据用户ID修改用户信息
   * @param {string} userId 用户Id
   * @param {string} data   用户修改信息
   * @return {object} result 更新结果
   */
  async updateUserInfoById (userId, data) {
    let _data = {
      email: data.email,
      avatar: data.avatar,
      introduction: data.introduction
    }
    let result = {
      success: false,
      message: ''
    }

    // 邮箱验证
    if (!validator.isEmail(data.email)) {
      result.message = userCode.ERROR_EMAIL
      return result
    }

    // 更新信息
    let updateResult = await userInfoModel.updateUserInfoById(userId, _data)
    if (!updateResult) {
      result.message = userCode.FAIL_USER_INFO_UPDATE
      return result
    }

    result.success = true
    result.message = userCode.SUCCESS_USER_INFO_READ

    return result
  }
}

module.exports = user
