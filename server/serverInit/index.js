import Hash from '../global/crypto'
import CatchError from './catchError'

function initail() {
  return async function(ctx, next) {
    const hash = new Hash({ algorithm: 'sha256' })
    const isApiPath = new RegExp(/^(\/api)(.*)/)
    if (isApiPath.test(ctx.path)) {
      const baseUrl = '/api'
      const signined = ctx.isAuthenticated()
      const routerUrl = new RegExp(/\/api\/(.*)/)
      const decryptoUrl = hash.depthObj(
        ctx.path.match(routerUrl)[1],
        'decryptoAES'
      )
      ctx.path = baseUrl + decryptoUrl
      console.log('pars', ctx.path)
      ctx.request.body = hash.depthObj(ctx.request.body, 'decryptoAES')
      const passPath = new RegExp(/^(\/api\/users\/(register|signin))(.*)/)
      // API请求验证
      if (!signined) {
        // 对于API请求，如果未登录，筛选出登录和注册API路由后进行拦截
        if (!passPath.test(ctx.path)) {
          // 筛选出不是登录和注册API路由，进行拦截
          console.log(
            '*********RegExp Test*********\n',
            ctx.path,
            passPath.test(ctx.path)
          )
          // 针对未登录的API请求进行拦截
          throw new CatchError('未登录请求', 401)
        }
      }
    }
    await next()
  }
}

export default {
  initail
}
