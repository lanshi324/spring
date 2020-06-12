// passport配置及策略
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import { User } from '../../../database/models'
import Hash from '../../../global/crypto'

// const userModel = sql.models.user.default

// ctx.login()触发
passport.serializeUser((user, done) => {
  done(null, user)
})
// 反序列化（请求时，session中存在:"passport": {"user": "1"}触发）
passport.deserializeUser(async (user, done) => {
  done(null, user)
})
// 提交数据(策略)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true
    },
    async function(ctx, userName, password, done) {
      const result = await User.findOne({
        where: {
          userName
        }
      })
      if (result) {
        const hash = new Hash({ algorithm: 'sha256' })
        const hmac = Hash.getHmac(password)
        password = hash.encryptoAES(hmac)
        if (result.dataValues.password === password) {
          return done(null, result)
        } else {
          return done(null, false, '密码错误')
        }
      } else {
        return done(null, false, '用户不存在')
      }
    }
  )
)

export default passport
