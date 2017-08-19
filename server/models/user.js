/**
 * 用户模型
 */
const dbUtils = require('../utils/db-_util')

const user = {
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('user', model)
    return result
  },

  /**
   * 数据库删除用户
   * @param  {string} userId  用户ID
   * @return {object}         执行结果
   */
  async deleteById (userId) {
    let result = await dbUtils.deleteDataById('user', userId)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne (options) {
    let _sql = `
    SELECT id from user
      where email="${options.email}" or username="${options.username}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options      用户名 | 密码
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword (options) {
    let _sql = `
    SELECT id from user
      where password="${options.password}" and username="${options.username}"
      limit 1`
    let result = await dbUtils.query(_sql)
    return result
  },

  /**
   * 根据用户名查找用户
   * @param  {string} username     用户名
   * @return {object|null}         查找结果
   */
  async getOneByUserName (username) {
    let _sql = `
    SELECT id from user
      where username="${username}"
      limit 1`
    let result = await dbUtils.query(_sql)
    return result
  },

  /**
   * 根据用户ID和密码查找用户
   * @param  {object} options      用户ID | 密码
   * @return {object|null}         查找结果
   */
  async getOneByIdAndPassword (options) {
    let _sql = `
    SELECT id from user
      where password="${options.password}" and id="${options.username}"
      limit 1`
    let result = await dbUtils.query(_sql)
    return result
  },

  /**
   * 更新用户信息
   * @param  {string} userId      用户ID
   * @param  {object} data        用户信息
   * @return {object|null}        执行结果
   */
  async updateDataById (userId, data) {
    let result = await dbUtils.updateData('user', data, userId)
    return result
  }
}

module.exports = user
