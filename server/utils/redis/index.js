import Redis from 'ioredis'
import { Store } from 'koa-session2'
import config from '../../global/config'

const { port, host, prefix, family, db, maxAge } = config.redis

class RedisStore extends Store {
  constructor(ctx, userPrefix, userMaxAge) {
    let user = {
      userName: '',
      password: ''
    }
    if (ctx && ctx.request && ctx.request.boday && ctx.request.boday.user) {
      user = ctx.request.boday.user
    }

    super()
    this.redis = new Redis({
      port,
      host,
      keyPrefix: userPrefix || prefix,
      family,
      db
    })
    this.userName = user.userName || ''
    this.password = user.password || ''
    this.maxAge = userMaxAge || maxAge
    this.setUserName = ''
  }

  setUser(value) {
    this.userName = value
  }

  async get(keyPrefix) {
    const data = await this.redis.get(
      this.setUserName || keyPrefix || this.userName
    )
    return JSON.parse(data)
  }

  async set(obj) {
    try {
      console.log('store', obj)
      await this.redis.set(
        this.setUserName || this.userName,
        JSON.stringify(obj),
        'EX',
        this.maxAge
      )
    } catch (error) {
      console.error('RedisStore.set(): ', error)
    }
  }

  async destory(userName) {
    return await this.redis.del(userName || this.userName)
  }
}

export default RedisStore
