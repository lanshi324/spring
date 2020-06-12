import nodeMailer from 'nodemailer'
import passport from '../auth/passport'
import { User } from '../../../database/models'
import emailConfig from '../../../global/config'
import Redis from '../../../utils/redis'
import Hash from '../../../global/crypto'
import { checkCode, checkColumn } from './utils'

const redis = new Redis({}, 'api-users:', 60 * 15)

export default class usersContorller {
  static async verifyCode(ctx) {
    const { userName, email, verificationCode } = await ctx.request.body
    const getUser = await User.findOne({
      where: { userName }
    })
    console.log('userToDb', getUser)
    ctx.body = await checkCode(userName, verificationCode)
  }

  static async register(ctx) {
    const { userName, email, verificationCode, password } = await ctx.request
      .body
    const checked = await checkCode(userName, verificationCode)
    if (checked.code !== 0) {
      ctx.body = checked
      return false
    }
    const insert = await User.create({
      userName,
      password: Hash.getHmac(password),
      email,
      userType: '未定义',
      byUser: userName
    })
    if (insert.id) {
      ctx.body = {
        code: 0,
        msg: '注册成功'
      }
      return true
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败'
      }
      return false
    }
  }

  static async checkColumn(ctx) {
    const body = await ctx.request.body
    const key = Object.keys(body)[0]
    console.log('body', key, body[key])
    ctx.body = await checkColumn(key, body[key])
  }

  static async signin(ctx, next) {
    return await passport.authenticate('local', (err, user, info, status) => {
      if (err) {
        ctx.body = {
          code: -1,
          msg: err
        }
      } else if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    })(ctx, next)
  }

  static async getName(ctx) {
    const { userName } = await ctx.request.body
    const getName = await User.findOne({
      attributes: ['userName'],
      where: {
        userName
      }
    })
    if (getName && getName.dataValues) {
      ctx.body = {
        code: 0,
        msg: '获取成功',
        data: getName.dataValues
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '获取失败，用户名不存在！'
      }
    }
  }

  static async getCode(ctx) {
    console.log('/getCode', ctx.request.body)
    const { userName, email } = await ctx.request.body
    redis.setUser(userName)
    const getRedis = await redis.get(userName)
    const expire = (getRedis && getRedis.expire) || 0
    console.log('store', expire)
    console.log('saveExpire', new Date().getTime() - expire * 1)
    if (expire && new Date().getTime() - expire * 1 < 0) {
      ctx.body = {
        code: -1,
        msg: '验证请求过于频繁，1分钟内一次'
      }
      return false
    }
    const transporter = nodeMailer.createTransport({
      host: emailConfig.smtp.host,
      port: 587,
      secure: false,
      auth: {
        user: emailConfig.smtp.user,
        pass: emailConfig.smtp.pass
      }
    })
    const ko = {
      code: emailConfig.smtp.code(),
      expire: emailConfig.smtp.expire(),
      email,
      user: userName
    }
    const info = await transporter.sendMail({
      from: `<${emailConfig.smtp.user}>`, // sender address
      to: email, // list of receivers
      subject: 'SpringRain用户注册码', // Subject line
      html: `<b style="color: red;">${ko.code}</b>` // html body
    })
    if (!info.rejected.length) {
      redis.set({
        userName,
        code: ko.code,
        expire: ko.expire,
        email: ko.email
      })
      const code = await redis.get(userName)
      console.log('code: ', code)
      ctx.body = {
        code: 0,
        msg: '验证码发送成功，可能会有延迟，有效期15分钟',
        info
      }
    }
  }

  static async exit(ctx) {
    await ctx.logout()
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0
      }
    } else {
      ctx.body = {
        code: -1
      }
    }
  }

  static async getUser(ctx) {
    if (ctx.isAuthenticated()) {
      const { userName, email } = ctx.session.passport.user
      ctx.body = {
        user: userName,
        email
      }
    } else {
      ctx.body = {
        code: -1,
        user: '',
        email: ''
      }
    }
  }
}
