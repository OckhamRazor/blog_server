/**
 * restful api 子路由
 */

const routers = require('koa-router')()
const user = require('./user')
const auth = require('./auth')
const article = require('./article')
const upload = require('./upload')

routers.use('/user', user.routes(), user.allowedMethods())
routers.use('/auth', auth.routes(), auth.allowedMethods())
routers.use('/article', article.routes(), article.allowedMethods())
routers.use('/upload', upload.routes(), upload.allowedMethods())

module.exports = routers
