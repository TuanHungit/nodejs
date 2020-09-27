'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    bankName: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    state: DataTypes.BOOLEAN
  }, {});
  Bank.associate = function(models) {
    // associations can be defined here
  };
  return Bank;
};