/**
 * 用户模型
 */
const dbUtils = require('../utils/db_util')
const mysql = require('mysql')

const user = {
  /**
   * 数据库创建用户权限信息
   * @param  {object} model 用户数据模型
   * @return {object}       执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('user_auth', model)
    return result
  },

  /**
   * 数据库删除用户
   * @param  {string} userId  用户ID
   * @return {object}         执行结果
   */
  async deleteById (userId) {
    let result = await dbUtils.deleteDataById('user_auth', userId)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne (options) {
    let _sql = `
      SELECT id from user_auth
      where user_id=?
      limit 1`
    let inserts = [options.userId]
  
    _sql = mysql.format(_sql, inserts)
    let result = await dbUtils.query(_sql)
  
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据身份凭据和凭据类型查找用户
   * @param  {object} options      身份凭据 | 凭据类型
   * @return {object|null}         查找结果
   */
  async getOneByIdentifier (options) {
    let _sql = `
      SELECT user_id from user_auth
      where identity_type=? and identifier=?
      limit 1`

    let inserts = [options.identityType, options.identifier]
    
    _sql = mysql.format(_sql, inserts)
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) { 
      result = result[0] 
    } else { 
      result = null 
    } 
    return result
  },

  /**
   * 根据身份凭据、凭据类型、密码 查找用户
   * @param  {object} options      身份凭据 | 凭据类型 | 密码
   * @return {object|null}         查找结果
   */
  async getOneByIdentifierAndCredential (options) {
    let _sql = `
      SELECT user_id from user_auth
      where identity_type=? and identifier=? and credential=?
      limit 1`

    let inserts = [options.identityType, options.identifier, options.credential]
    
    _sql = mysql.format(_sql, inserts)
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) { 
      result = result[0] 
    } else { 
      result = null 
    } 
    return result
  }
}

module.exports = user
