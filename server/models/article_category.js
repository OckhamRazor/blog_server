/**
 * 文章模型
 */
const dbUtils = require('../utils/db_util')

const articleCategory = {
   /**
   * 数据库创建文章分类信息
   * @param  {object} model 文章分类信息
   * @return {object}       执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('article_category', model)
    return result
  },

  /**
   * 获取所有文章分类
   * @return {object|null}        查找结果
   */
  async getCategory () {
    let result = await dbUtils.select('article_category', '*')
    if (Array.isArray(result) && result.length > 0) {
      result = result
    } else {
      result = null
    }
    return result
  },

  /**
   * 获取文章分类统计信息
   */
  async getCategoryStatistics () {
    let _sql = `
      SELECT category as id, name, COUNT(category) as count from article AS w INNER JOIN article_category AS f on f.id=w.category where status!=1 GROUP BY id
    `
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result
    } else {
      result = null
    }
    return result
  }
}

module.exports = articleCategory
