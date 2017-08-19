/**
 * 用户信息业务操作
 */
const validator = require('validator')
const userModel = require('./../models/user')
const userInfoModel = require('./../models/userInfo')
const userCode = require('./../codes/user')

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
    let _createUserInforesult = await userInfoModel.create({
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
    let _writeOffUserResult = userInfoModel.updateUserInfoById(userId, {status: 1})
    
    if (!result) {
      result.message = userCode.FAILED_USER_WRITE_OFF
      return result
    }

    result.success = false
    result.message = userCode.SUCCESS_USER_WRITE_OFF
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
