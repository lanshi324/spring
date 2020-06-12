export default {
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'springRain_development',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Cloud667232io61',
  options: {
    dialect: process.env.DIALECT || 'mysql',
    host: process.env.HOST || '127.0.0.1',
    timezone: '+08:00'
  }
}
