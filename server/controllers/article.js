const articleService = require('./../services/article')
const articleCategoryService = require('./../services/article_category')
const userToken = require('../utils/token/user_token')

module.exports = {

  /**
   * 获取文章分类列表
   * @param  {obejct} ctx 上下文对象
   */
  async getArticleCategory (ctx) {
    let result = await articleCategoryService.getArticleCategory()
    ctx.body = result
  },

  /**
   * 获取文章分类统计信息
   * @param  {obejct} ctx 上下文对象
   */
  async getArticleCategoryStatistics (ctx) {
    let result = await articleCategoryService.getArticleCategoryStatistics()
    ctx.body = result
  },

  /**
   * 创建文章
   * @param  {obejct} ctx 上下文对象
   */
  async createArticle (ctx) {
    let formData = ctx.request.body
    const authorization = ctx.get('Authorization') 
    const token = authorization.split(' ')[1] 
    const tokenInfo = userToken.decryptToken(token) // 解析token获取用户ID

    formData.author_id = tokenInfo.userId || 0
    
    let result = await articleService.createArticle(formData)
    ctx.body = result
  },

  /**
   * 获取已发布文章
   * @param  {obejct} ctx 上下文对象
   */
  async getArticle (ctx) {
    const articleId = ctx.params.id
    const query = ctx.request.body
    let result = await articleService.getArticle(articleId, query)

    ctx.body = result
  },

  /**
   * 获取最新保存（发布）文章
   * @param  {obejct} ctx 上下文对象
   */
  async getArticleTemp (ctx) {
    const articleId = ctx.params.id
    let result = await articleService.getArticleTemp(articleId)

    ctx.body = result
  },

  /**
   * 更新文章信息
   * @param  {obejct} ctx 上下文对象
   */
  async updateArticle (ctx) {
    const articleId = ctx.params.id
    let formData = ctx.request.body

    let result = await articleService.updateArticle(articleId, formData)

    ctx.body = result
  },

  /**
   * 发布文章
   * @param  {obejct} ctx 上下文对象
   */
  async publishArticle (ctx) {
    const articleId = ctx.params.id

    let result = await articleService.publishArticle(articleId)

    ctx.body = result
  },

  /**
   * 删除文章
   * @param  {obejct} ctx 上下文对象
   */
  async deleteArticle (ctx) {
    const articleId = ctx.params.id

    let result = await articleService.deleteArticle(articleId)

    ctx.body = result
  },

  /**
   * 获取暂存文章列表
   * @param  {obejct} ctx 上下文对象
   */
  async getTempArticleList (ctx) {
    let queryParams = ctx.request.query

    let result = await articleService.getTempArticleList(queryParams)

    ctx.body = result
  },

  /**
   * 获取已发布文章列表
   * @param  {obejct} ctx 上下文对象
   */
  async getPublishedArticleList (ctx) {
    let queryParams = ctx.request.query

    let result = await articleService.getPublishedArticleList(queryParams)

    ctx.body = result
  }
}
