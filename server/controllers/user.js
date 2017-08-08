const userInfoService = require('./../services/user-info')
const userCode = require('./../codes/user')
const createToken = require('../utils/token/create-token')
const sha1 = require('sha1')

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn (ctx) {
    let formData = ctx.request.body
    let username = formData.userName
    formData.password = sha1(formData.password)

    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    let userResult = await userInfoService.signIn(formData)

    if (userResult.info) {
      let token = createToken(username)
      result.code = 1
      result.data = {
        token: token
      }
    } else {
      result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
    }

    ctx.body = result
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let validateResult = userInfoService.validatorSignUp(formData)

    if (validateResult.success === false) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne = await userInfoService.getExistOne(formData)
    console.log(existOne)

    if (existOne) {
      if (existOne.name === formData.userName) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }

    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      create_time: new Date().getTime(),
      level: 1
    })

    console.log(userResult)

    if (userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo (ctx) {
    console.log('ctx:', ctx)
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log('session=', session)

    // let result = {
    //   success: false,
    //   message: '',
    //   data: null
    // }
    // if (isLogin === true && userName) {
    //   let userInfo = await userInfoService.getUserInfoByUserName(userName)
    //   if (userInfo) {
    //     result.data = userInfo
    //     result.success = true
    //   } else {
    //     result.message = userCode.FAIL_USER_NO_LOGIN
    //   }
    // } else {
    //   // TODO
    // }

    ctx.body = {
      username: 'razor',
      avatar: '/static/images/avatar.jpg',
      description: '有趣的小伙子'
    }
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin (ctx) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    } 
    let session = ctx.session
    if (session && session.isLogin === true) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  }
}
