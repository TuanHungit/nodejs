'use strict';
module.exports = (sequelize, DataTypes) => {
  const GiaoDich = sequelize.define('GiaoDich', {
    theNguon: DataTypes.STRING,
    theDich: DataTypes.STRING,
    tkNguon: DataTypes.STRING,
    tkDich: DataTypes.STRING,
    tenNguoiGui: DataTypes.STRING,
    tenNguoiNhan: DataTypes.STRING,
    soTien: DataTypes.DOUBLE,
    nganHang: DataTypes.STRING,
    phiGiaoDich: DataTypes.DOUBLE,
    nguoiTraPhi: DataTypes.STRING,
    tinNhan: DataTypes.STRING
  }, {});
  GiaoDich.associate = function(models) {
    // associations can be defined here
  };
  return GiaoDich;
};
