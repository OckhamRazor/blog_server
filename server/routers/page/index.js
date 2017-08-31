
// 页面路由权限控制
const router = require('koa-router')()

const userToken = require('../../utils/token/user_token')
const indexControll = require('../../controllers/index')

const routers = router
  .get('home', indexControll.indexPage)
  .get('login', indexControll.indexPage)
  .get('article/list', indexControll.indexPage)
  .get('article/:id', indexControll.indexPage)
  .get('user', userToken.checkToken, indexControll.indexPage)

module.exports = routers
