/**
 * 文章模型
 */
const dbUtils = require('../utils/db_util')
const mysql = require('mysql')

const articleTemp = {
  /**
   * 创建文章信息
   * @param  {string} model    文章数据模型
   * @return {object|null}     执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('article_temp', model)
    return result
  },

  /**
   * 根据文章ID删除文章
   * @param  {string} articleId   文章ID
   * @return {object|null}        执行结果
   */
  async deleteById (articleId) {
    let result = await dbUtils.deleteDataById('article_temp', articleId)
    return result
  },

  /**
   * 根据文章ID获取文章信息
   * @param  {string} articleId   文章ID
   * @return {object|null}        查找结果
   */
  async getArticleById (articleId) {
    let result = await dbUtils.findDataById('article_temp', articleId)
    if (Array.isArray(result) && result.length > 0) { 
      result = result[0] 
    } else { 
      result = null 
    } 
    return result
  },

  /**
   * 根据文章ID更新文章
   * @param  {string} articleId 文章ID
   * @return {boolean}          执行结果
   */
  async updateArticleById (articleId, data) {
    let result = await dbUtils.updateData(
      'article_temp',
      data,
      articleId
    )
    return result
  },

  /**
   * 根据文章ID查询是否存在
   * @param  {string} articleId 文章ID
   * @return {boolean}          执行结果
   */
  async getExistOne (articleId, data) {
    let _sql = `
      SELECT id from article_temp
      where status!=1 and id=? 
      limit 1`
    
    _sql = mysql.format(_sql, articleId)
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据查询参数获取文章列表
   * @param {object} 查询参数
   * @return {array|null} 文章列表
   */
  async getArticleList (params) {
    let _where = 'status!=1'
    if (typeof params.category !== 'undefined' && params.category !== 'all') {
      _where += ' and category=' + mysql.escape(params.category)
    }
  
    if (typeof params.keywords !== 'undefined' && params.keywords.length > 0) {
      let _keywords = params.keywords.join('|')
      _where += ' and concat(title, tag) regexp ' + mysql.escape(_keywords)
    }
  
    let _sql = `
    select ?? from article_temp where
  ` + _where
    let _inserts = [['id', 'title', 'tag', 'category', 'author_id', 'create_time']]
    _sql = mysql.format(_sql, _inserts)

    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result
    } else {
      result = null
    }
    return result
  }
}

module.exports = articleTemp
