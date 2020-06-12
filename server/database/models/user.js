'use strict'
export default (sequelize, DataTypes) => {
  const User = sequelize.defineModel(
    'User',
    {
      userName: {
        type: DataTypes.STRING,
        unique: 'userName'
      },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: 'email'
      },
      userType: DataTypes.ENUM('未定义', '管理员', '主任', '职工')
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
