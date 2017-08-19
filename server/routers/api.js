/**
 * restful api 子路由
 */

const routers = require('koa-router')()
const user = require('./modules/user')
const auth = require('./modules/auth')
const upload = require('./modules/upload')

routers.use('/user', user.routes(), user.allowedMethods())
routers.use('/auth', auth.routes(), auth.allowedMethods())
routers.use('/upload', upload.routes(), upload.allowedMethods())

module.exports = routers
