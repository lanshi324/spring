'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = Date.now()
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'CloudWoR',
          password: 123,
          email: '756590854@qq.com',
          userType: '管理员',
          createdAt: now,
          updatedAt: now,
          byUser: '系统',
          version: 1
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
