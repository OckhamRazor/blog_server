/**
 * /api/user 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../../controllers/user')
const checkToken = require('../../utils/token/checkToken')

const routers = router
  .get('/', checkToken, userInfoController.getLoginUserInfo)
  .put('/', checkToken, userInfoController.updateUserInfo)
  

module.exports = routers
