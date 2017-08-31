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
    let result = await dbUtils.insertData('user', model)
    return result
  },

  /**
   * 根据用户ID删除用户信息
   * @param  {string} userId   用户ID
   * @return {object|null}     执行结果
   */
  async deleteById (userId) {
    let result = await dbUtils.deleteDataById('user', userId)
    return result
  },

  /**
   * 根据用户ID查找用户信息
   * @param  {string} userId 用户ID
   * @return {object|null}     查找结果
   */
  async getUserInfoById (userId) {
    let result = await dbUtils.findDataById('user', userId)
    if (Array.isArray(result) && result.length > 0) { 
      result = result[0] 
    } else { 
      result = null 
    } 
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
      'user',
      data,
      userId
    )
    return result
  }
}

module.exports = userInfo
