'use strict';
module.exports = (sequelize, DataTypes) => {
  const NapThe = sequelize.define('NapThe', {
    MenhGia: DataTypes.INTEGER,
    nhaMang: DataTypes.STRING,
    chiPhi: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING,
    fullname: DataTypes.STRING,
    code: DataTypes.STRING,
    seri: DataTypes.STRING
  }, {});
  NapThe.associate = function(models) {
    // associations can be defined here
  };
  return NapThe;
};