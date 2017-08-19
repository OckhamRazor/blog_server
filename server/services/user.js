/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('./../models/userInfo')
const userCode = require('./../codes/user')
const createToken = require('../utils/token/createToken')
const decryptToken = require('../utils/token/decryptToken')
const sha1 = require('sha1')

const user = {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create (user) {
    let result = await userModel.create(user)
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne (formData) {
    let resultData = await userModel.getExistOne({
      'username': formData.username
    })
    return resultData
  },

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

    let data = await userModel.getOneByUserNameAndPassword({
      'password': sha1(formData.password),
      'username': formData.username})
    
    if (data) {
      let userId = data.id
      result.success = true
      result.message = userCode.SUCCESS_SIGN_IN
      result.data = {
        token: createToken(userId),
        exp: 10
      }
    } else {
      result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
    }
    
    return result
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

    let data = await userModel.getUserInfoById(userId)

    if (data) {
      data.roles = data.role.split(',')
      result.success = true
      result.message = userCode.SUCCESS_USER_INFO_READ
      result.data = data
    } else {
      result.message = userCode.FAILED_USER_INFO_READ
    }

    return result
  },

  /**
   * 根据用户ID修改用户信息
   * 修改密码需要先验证原密码
   * @param {string} userId 用户Id
   * @param {object} result 更新结果
   */
  async updateUserInfoById (userId, data) {
    let _data = {
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      introduction: data.introduction
    }
    let result = {
      success: false,
      message: ''
    }
    // 用户名长度验证
    if (!validator.isLength(data.username, {min: 3, max: 20})) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }

    // 邮箱验证
    if (!validator.isEmail(data.email)) {
      result.message = userCode.ERROR_EMAIL
      return result
    }

    // 密码验证 
    if (data.oldPassword && data.newPassword && data.checkedPassword) {
      if (!validator.isLength(data.newPassword, {min: 3, max: 20})) {
        result.message = userCode.ERROR_PASSWORD
        return result
      }

      
      let oldPassword = sha1(data.oldPassword)
      let isExist = await userModel.validatePassword(userId, oldPassword)
      if (isExist) {
        _data.password = sha1(data.newPassword)
      } else {
        result.message = userCode.PASSWORD_ERROR
        return result
      }
    }
  
    // 更新信息
    let updateResult = await userModel.updateUserInfoById(userId, _data)
    if (!updateResult) {
      result.message = userCode.FAIL_USER_UPDATE
      return result
    }

    result.success = true
    result.message = userCode.SUCCESS_USER_UPDATE

    return result
  },

  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp (userInfo) {
    let result = {
      success: false,
      message: ''
    }

    if (/[a - z0-9\_\ - ] {6, 16}/.test(userInfo.username) === false) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if (!/[\w + ] {6, 16}/.test(userInfo.password)) {
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
}

module.exports = user
