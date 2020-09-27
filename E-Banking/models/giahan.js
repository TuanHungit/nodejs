'use strict';
module.exports = (sequelize, DataTypes) => {
  const GiaHan = sequelize.define('GiaHan', {
    fullname: DataTypes.STRING,
    soThe: DataTypes.STRING,
    loaiThe: DataTypes.STRING,
    soThang: DataTypes.INTEGER,
    chiPhi: DataTypes.DOUBLE,
    accountId: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING
  }, {});
  GiaHan.associate = function(models) {
    // associations can be defined here

  };
  return GiaHan;
};