import Redis from 'ioredis'
import { Store } from 'koa-session2'
import consola from 'consola'
import config from '../../global/config'

const { port, host, prefix, family, db, maxAge } = config.redis

class RedisStore extends Store {
  constructor() {
    super()
    this.redis = new Redis({
      port,
      host,
      family,
      db
    })
    ;(this.prefix = prefix), (this.maxAge = maxAge)
  }

  async get(sid, ctx) {
    const data = await this.redis.get(`${this.prefix}:${sid}`)
    return JSON.parse(data)
  }

  async set(session, { sid = this.getID(24), maxAge = this.maxAge } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(
        `${this.prefix}:${sid}`,
        JSON.stringify(session),
        'EX',
        maxAge / 1000
      )
    } catch (e) {
      consola.error('redis-store: ', e)
    }
    return sid
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`)
  }
}

export default RedisStore
