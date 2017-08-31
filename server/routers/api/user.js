/**
 * /api/user 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../../controllers/user')
const userToken = require('../../utils/token/user_token')

const routers = router
  .get('/', userToken.checkToken, userInfoController.getLoginUserInfo)
  .put('/', userToken.checkToken, userInfoController.updateUserInfo)

module.exports = routers
