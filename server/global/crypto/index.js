/* eslint-disable*/
import crypto from 'crypto'
import config from '../config'
const { iv: config_iv, key: config_key } = config.crypto

/**
 * 全局使用此类的实例对前后端通信数据进行加密解密
 */
class Hash {
  constructor({ iv, key, hashType, algorithm, valueType } = {}) {
    this.iv = iv || config_iv
    this.key = key || config_key
    this.hashType = hashType || 'Hash'
    this.algorithm = algorithm || 'sha256'
    this.valueType = valueType || 'hex'
  }
  static getHash(str, algorithm) {
    try {
      const alg = algorithm || 'md5'
      let sha = crypto.createHash(alg)
      sha.update(str)
      return sha.digest('hex')
    } catch (error) {
      return error
    }
  }
  static getHmac(str, userKey, algorithm) {
    try {
      const alg = algorithm || 'md5'
      const key = userKey || config_key
      let sha = crypto.createHmac(alg, key)
      sha.update(str)
      return sha.digest('hex')
    } catch (error) {
      return error
    }
  }
  encryptoAES(data, key, iv) {
    if (toString.call(data) === '[object Number]') {
      data = data.toString()
    }
    try {
      const cipher = crypto.createCipheriv(
        'aes-128-cbc',
        key || this.key,
        iv || this.iv
      )
      let crypted = cipher.update(data, 'utf8', 'hex')
      crypted += cipher.final('hex')
      return crypted
    } catch (error) {
      console.log('error', error)
      return error
    }
  }
  decryptoAES(encrypted, key, iv) {
    try {
      const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        key || this.key,
        iv || this.iv
      )
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch (error) {
      console.log('error', error)
      return error
    }
  }
  depthObj(data, method) {
    let passData
    if (toString.call(data) === '[object Object]') {
      passData = {}
      const keys = Object.keys(data)
      if (
        keys.length === 1 && 
        keys[0] === 'isNumber_crypto' && 
        !isNaN(this[method](data.isNumber_crypto) * 1)
        ){
        return this[method](data.isNumber_crypto) * 1
      }
      keys.forEach((key) => {
        passData[key] = this.depthObj(data[key], method)
      })
    } else if (toString.call(data) === '[object String]') {
        // if (!isNaN(this[method](data) * 1)) {
        //   return this[method](data) * 1
        // }
      return this[method](data)
    } else if (toString.call(data) === '[object Array]') {
      passData = []
      data.forEach((item) => {
        passData.push(this.depthObj(item, method))
      })
    } else if (toString.call(data) === '[object Number]') {
      let typeNumber = { isNumber_crypto: data.toString()}
      console.log('typeNumber: ', typeNumber)
      
      return this.depthObj(typeNumber, method)
    } else if (toString.call(data) === '[object Boolean]') {
      return data
    }
    return passData
  }
}

export default Hash
