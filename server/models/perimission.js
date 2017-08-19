/**
 * 角色权限模型
 */
const dbUtils = require('../utils/db_util')

const perimission = {
  /**
   * 数据库创建角色权限信息
   * @param  {object} model 角色数据模型
   * @return {object}       执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('perimission', model)
    return result
  },

  /**
   * 获取角色对应的权限信息
   * @param  {string} roleId      角色ID
   * @return {object|null}        查找结果
   */
  async getPermissions (roleId) {
    let result = await dbUtils.findDataById('perimission', roleId)
    return result
  }
}

module.exports = perimission
