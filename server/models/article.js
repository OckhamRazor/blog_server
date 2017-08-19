/**
 * 文章模型
 */
const dbUtils = require('../utils/db_util')

const article = {
  /**
   * 创建文章信息
   * @param  {string} model    文章数据模型
   * @return {object|null}     执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('article', model)
    return result
  },

  /**
   * 根据文章ID删除文章
   * @param  {string} articleId   文章ID
   * @return {object|null}        执行结果
   */
  async deleteById (articleId) {
    let result = await dbUtils.deleteDataById('article', articleId)
    return result
  },

  /**
   * 根据文章ID获取文章信息
   * @param  {string} articleId   文章ID
   * @return {object|null}        查找结果
   */
  async getArticleById (articleId) {
    let result = await dbUtils.findDataById('article', articleId)
    return result
  },

  /**
   * 根据文章ID更新文章
   * @param  {string} articleId 文章ID
   * @return {boolean}          执行结果
   */
  async updateArticleById (articleId, data) {
    let result = await dbUtils.updateData(
      'article',
      data,
      articleId
    )
    return result
  }
}

module.exports = article
