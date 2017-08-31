/**
 * /api/auth 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../../controllers/user')

const routers = router
  .post('/', userInfoController.signIn)
  .post('/github', userInfoController.signInByGithub)

module.exports = routers
