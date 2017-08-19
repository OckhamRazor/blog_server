/**
 * /api/user 子路由
 */

const router = require('koa-router')()
const uploadController = require('../../controllers/upload')
const checkToken = require('../../utils/token/checkToken')

const routers = router
  .post('/token', checkToken, uploadController.getUploadToken)
  

module.exports = routers
