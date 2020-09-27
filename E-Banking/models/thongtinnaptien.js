'use strict';
module.exports = (sequelize, DataTypes) => {
  const ThongTinNapTien = sequelize.define('ThongTinNapTien', {
    fullname: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    phuongThuc: DataTypes.STRING,
    soTien: DataTypes.DOUBLE
  }, {});
  ThongTinNapTien.associate = function(models) {
    // associations can be defined here
  };
  return ThongTinNapTien;
};