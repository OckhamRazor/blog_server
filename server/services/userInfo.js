/**
 * 用户信息业务操作
 */
const validator = require('validator')
const userModel = require('./../models/user')
const userInfoModel = require('./../models/userInfo')
const userCode = require('./../codes/user')
const createToken = require('../utils/token/createToken')
const decryptToken = require('../utils/token/decryptToken')
const sha1 = require('sha1')

const user = {

  /**
   * 创建用户信息
   * @param  {object} userInfo 用户信息
   * @return {object}      创建结果
   */
  async create (userInfo) {
    let result = {
      success: false,
      message: ''
    }

    let isExist = await userModel.getExistOne(userInfo)
    // 判断用户是否存在
    if (isExist) {
      result.message = userCode.FAIL_USER_NAME_IS_EXIST
      return result
    }
    // 创建用户
    let _createUserResult = await userModel.create(userInfo)
    if (!_createUserResult) {
      result.message = userCode.FAILED_USER_CREATE
      return
    }
    // 获取创建的用户ID
    let _userId = await userModel.getOneByUserName(userInfo.username)
    // 创建用户信息表
    await userInfoModel.create({
      id: _userId,
      username: userInfo.username
    })

    return result
  },

  /**
   * 根据用户ID注销用户信息
   * @param {string} userId 用户ID
   * @param {object} result 更新结果
   */
  async writeOffUserInfoById (userId) {
    let result = {
      success: false,
      message: ''
    }

    let _writeOffUserResult = userModel.updateUserInfoById(userId, {status: 1})

    if (!_writeOffUserResult) {
      result.message = userCode.FAILED_USER_WRITE_OFF
      return result
    }

    result.success = false
    result.message = userCode.SUCCESS_USER_WRITE_OFF
    return result
  },

  /**
   * 查找是否存在用户
   * @param  {object} formData 查找的表单数据
   * @return {boolean|null}      查找结果
   */
  async getExistOne (formData) {
    let resultData = await userModel.getExistOne({
      'username': formData.username
    })
    if (resultData) {
      return true
    }
    return false
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

    if (!data) {
      result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
      return result
    }

    let userId = data.id
    result.success = true
    result.message = userCode.SUCCESS_SIGN_IN
    result.data = {
      token: createToken(userId),
      exp: 10
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

    let data = await userInfoModel.getUserInfoById(userId)

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
   * @param {string} userId 用户Id
   * @param {string} data   用户修改信息
   * @param {object} result 更新结果
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
  },

  // 数据校验
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
