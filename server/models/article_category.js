/**
 * 文章模型
 */
const dbUtils = require('../utils/db-util')

const articleCategory = {
   /**
   * 数据库创建角色权限信息
   * @param  {object} model 角色数据模型
   * @return {object}       执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('article_category', model)
    return result
  },

  /**
   * 获取所有分类信息
   * @return {object|null}        查找结果
   */
  async getCategories () {
    let result = await dbUtils.select('article_category', '*')
    return result
  }
}

module.exports = articleCategory
