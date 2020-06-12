import users from './users'
import mysql from './mysql'

const modules = {
  users,
  mysql
}
export default (app) => {
  Object.keys(modules).forEach((item) => {
    app.use(modules[item].routes()).use(modules[item].allowedMethods())
  })
}
