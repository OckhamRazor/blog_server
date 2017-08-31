/**
 * /api/user 子路由
 */

const router = require('koa-router')()
const uploadController = require('../../controllers/upload')
const userToken = require('../../utils/token/user_token')

const routers = router
  .post('/token', userToken.checkToken, uploadController.getUploadToken)

module.exports = routers
