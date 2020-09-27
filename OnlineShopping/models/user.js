'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    fullname: DataTypes.STRING,
    avatarPath: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.comment, {
      foreignKey: 'userId'
    });

    user.hasMany(models.review, {
      foreignKey: 'userId'
    });
  };
  return user;
};