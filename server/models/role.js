/**
 * 角色模型
 */
const dbUtils = require('../utils/db-util')

const role = {
  /**
   * 数据库创建角色
   * @param  {object} model 角色数据模型
   * @return {object}       执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('role', model)
    return result
  },

  /**
   * 获取所有角色信息
   * @return {object|null}         查找结果
   */
  async getRoles (options) {
    let result = await dbUtils.select('role', '*')
    return result
  }
}

module.exports = role
