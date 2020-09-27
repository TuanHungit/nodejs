'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    fullname: DataTypes.STRING,
    identity: DataTypes.STRING,
    dateofbirth: DataTypes.STRING,
    avatarPath: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Account,{foreignKey:"accountId"});
    User.hasMany(models.Passbook,{foreignKey:"passbookId"});
    //User.hasMany(models.Passbook,{foreignKey:"userId"});
  };
  return User;
};