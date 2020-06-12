import path from 'path'
import fs from 'fs'
import Koa from 'koa'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import session from 'koa-session2'
import koaBody from 'koa-body'
import json from 'koa-json'
import Store from './utils/redis/store'
import interfase from './routers'
import { sequelize } from './database/models'
import passport from './routers/users/auth/passport'
import serverInit from './serverInit'
import redis_config from './global/config'
const app = new Koa()
const { initail } = serverInit
const maxAge = redis_config.redis.maxAge

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'
app.proxy = true

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500
    ctx.body = error.message
    ctx.app.emit('error', error) // 触发应用层级错误事件
  }
})

app.use(
  session({
    store: new Store(),
    key: 'SESSIONID',
    maxAge
  })
)

app.use(
  koaBody({
    multipart: true, // 支持文件上传
    encoding: 'utf-8',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'), // 文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 10 * 1014 * 1024, // 文件上传大小限制 10M
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        const uploadDir = path.join(__dirname, 'public/upload/')
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir) // 如果没有文件夹，创建一个public/upload文件夹
        }
        console.log(`koaBody: name:${name}, file:${util.inspect(file)}`)
      }
    }
  })
)
app.use(json())
app.use(passport.initialize())
app.use(passport.session())

// 接口请求初始化，控制请求数据，API请求拦截等
app.use(initail())

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 路由导入
  interfase(app)

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    ctx.req.session = ctx.session.passport // 将session赋值给req，使store中的nuxtServerInit()能够调用
    nuxt.render(ctx.req, ctx.res)
  })

  app.on('error', (err) => {
    console.log('server error: ', err)
  })

  sequelize.sync({ alter: true }).then(() => {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}

start()
