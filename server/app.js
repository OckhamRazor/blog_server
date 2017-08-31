const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var cors = require('koa2-cors')

const config = require('./config/index')
const routers = require('./routers/index')

const app = new Koa()

// 中间件配置

// 配置控制台日志
app.use(logger())
// 设置跨域
app.use(cors())
// 配置ctx.body解析
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// 配置静态资源加载
app.use(koaStatic(
  path.join(__dirname, './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './../static')))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
