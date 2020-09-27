'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    accountNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.STRING,
    otp: DataTypes.STRING,
    otpExpires: DataTypes.STRING
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
    Account.belongsTo(models.User,{foreignKey:"userId"});
    Account.hasMany(models.CreditCard,{foreignKey:"accountId"});
    Account.hasMany(models.CapThe, {foreignKey:"accountId"});
  };
  return Account;
};