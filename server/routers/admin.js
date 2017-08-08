/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const admin = require('./../controllers/admin')

router.get('/', admin.indexPage)

module.exports = router
