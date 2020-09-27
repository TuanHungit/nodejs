'use strict';
module.exports = (sequelize, DataTypes) => {
  const BieuPhiChuyenTien = sequelize.define('BieuPhiChuyenTien', {
    loai: DataTypes.STRING,    
    soTien: DataTypes.DOUBLE,
    dieuKien: DataTypes.STRING
  }, {});
  BieuPhiChuyenTien.associate = function(models) {
    // associations can be defined here
    //LaiSuat.hasMany(models.Passbook,{foreignKey:"passbookId"});
  };
  return BieuPhiChuyenTien;
};
