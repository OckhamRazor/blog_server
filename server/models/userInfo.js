/**
 * 用户信息模型
 */
const dbUtils = require('../utils/db_util')

const userInfo = {
  /**
   * 创建用户信息
   * @param  {string} model    用户信息
   * @return {object|null}     执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('user_info', model)
    return result
  },

  /**
   * 根据用户ID删除用户信息
   * @param  {string} userId   用户ID
   * @return {object|null}     执行结果
   */
  async deleteById (userId) {
    let result = await dbUtils.deleteDataById('user_info', userId)
    return result
  },

  /**
   * 根据用户ID查找用户信息
   * @param  {string} userId 用户ID
   * @return {object|null}     查找结果
   */
  async getUserInfoById (userId) {
    let result = await dbUtils.findDataById('user_info', userId)
    return result
  },

  /**
   * 根据用户ID更新用户信息
   * @param  {string} userId 用户ID
   * @param  {object} data   用户信息
   * @return {boolean}       执行结果
   */
  async updateUserInfoById (userId, data) {
    let result = await dbUtils.updateData(
      'user_info',
      data,
      userId
    )
    return result
  }
}

module.exports = userInfo
