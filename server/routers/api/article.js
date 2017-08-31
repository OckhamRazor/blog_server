/**
 * /api/article 子路由
 */

const router = require('koa-router')()
const articleController = require('../../controllers/article')

const routers = router
  .get('/category', articleController.getArticleCategory) // 获取文章分类列表
  .get('/category/statistics', articleController.getArticleCategoryStatistics) // 获取文章分类统计列表
  .post('/temp', articleController.createArticle) // 创建文章
  .get('/temp/:id', articleController.getArticleTemp) // 获取暂存文章
  .patch('/temp/:id', articleController.updateArticle) // 更新文章
  .get('/:id', articleController.getArticle) // 获取文章
  .post('/:id', articleController.publishArticle) // 发布文章
  .delete('/:id', articleController.deleteArticle) // 删除文章
  .get('/temp', articleController.getTempArticleList) // 获取暂存文章列表
  .get('/', articleController.getPublishedArticleList) // 获取已发布文章列表

module.exports = routers
