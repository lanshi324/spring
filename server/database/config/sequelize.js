import { Sequelize } from 'sequelize'
import Hash from '../../global/crypto'

const hash = new Hash({ algorithm: 'sha256' })
export default class SequelizeModel extends Sequelize {
  constructor(config) {
    const { database, username, password, options } = config
    super(database, username, password, options)
  }

  defineModel(name, attributes) {
    const attrs = {}
    for (const key in attributes) {
      const value = attributes[key]
      if (typeof value === 'object' && value.type) {
        value.allowNull = value.allowNull || false
        attrs[key] = value
      } else {
        attrs[key] = {
          type: value
        }
      }
    }
    attrs.id = {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
    attrs.createdAt = {
      type: Sequelize.BIGINT,
      allowNull: false
    }
    attrs.updatedAt = {
      type: Sequelize.BIGINT,
      allowNull: false
    }
    attrs.byUser = {
      type: Sequelize.STRING(10),
      allowNull: false
    }
    attrs.version = {
      type: Sequelize.INTEGER(3),
      allowNull: false,
      defaultValue: 1
    }
    return this.define(name, attrs, {
      timestamps: false,
      initialAutoIncrement: 10000,
      hooks: {
        beforeValidate: (obj) => {
          const now = Date.now()
          if (obj.isNewRecord) {
            obj.password && (obj.password = hash.encryptoAES(obj.password))
            obj.createdAt = now
            obj.updatedAt = now
          } else {
            obj.updatedAt = now
            obj.version++
          }
        }
      }
    })
  }
}
