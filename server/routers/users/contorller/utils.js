import Redis from '../../../utils/redis'
import { User } from '../../../database/models'
// import sql from '../../../database/main'

// const userModel = sql.models.user.default
const redis = new Redis({}, 'api-users:', 60 * 15)

export async function checkCode(userName, verificationCode) {
  redis.setUser(userName)
  const { code } = (await redis.get(userName)) || { code: null }
  let body = {}
  if (!code) {
    return (body = {
      code: -1,
      msg: '未获取验证码或验证码已失效，请重新获取。'
    })
  }
  if (code === verificationCode) {
    return (body = {
      code: 0,
      msg: '恭喜，验证通过。'
    })
  } else {
    return (body = {
      code: -1,
      msg: '验证码错误，请检查邮件信息或重新获取邮件。'
    })
  }
}

// 检查某条数据在数据库内是否有记录
export async function checkColumn(column, value) {
  try {
    const getDb = await User.findOne({
      where: {
        [column]: value
      }
    })
    if (getDb) {
      return {
        code: -1,
        msg: '查询到数据库存在该数据',
        getDb
      }
    } else {
      return {
        code: 0,
        msg: '未查询到相关数据'
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}
