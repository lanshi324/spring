import db from '../../../database/models'

export default class mysqlContorller {
  static async sync(ctx) {
    try {
      await db.sequelize.sync({ force: true })
      ctx.body = {
        code: 0,
        msg: '同步数据表'
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: `同步数据库失败: ${error}`
      }
    }
  }
}
