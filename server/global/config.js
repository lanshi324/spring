export default {
  masterDatabase: 'mysql',
  masterDatabaseOption: {
    host: '127.0.0.1',
    user: 'springRain',
    password: 'Summer412678io61',
    database: 'SpringRainStation'
  },
  pacsDatabase: 'mssql',
  pacsDatabaseOption: {
    address: '192.168.11.218'
  },
  ortherInterface: 'Retain',
  ortherInterfaceOption: {},
  redis: {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    prefix: 'SESSIONID',
    password: '',
    maxAge: 60 * 30 * 1000,
    db: 0
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '756590854@qq.com'
    },
    get pass() {
      return 'rnmaqnqblrizbebg'
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    get expire() {
      // 过期时间。
      return () => {
        return new Date().getTime() + 60 * 1000
      }
    }
  },
  administrator: {
    userName: 'cloudWoR',
    password: '123',
    userType: '管理员'
  },
  crypto: {
    // 上线采取执行一次的Math.random()来生成随机key和iv
    key: '9cd5b4cf89949209',
    iv: 'e6db271db12d4d47'
  }
}
