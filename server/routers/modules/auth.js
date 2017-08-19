/**
 * /api/auth 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../../controllers/user')

const routers = router
  .post('/', userInfoController.signIn)

module.exports = routers
