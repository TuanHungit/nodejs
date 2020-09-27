'use strict';
module.exports = (sequelize, DataTypes) => {
  const LaiSuat = sequelize.define('LaiSuat', {
    kiGoi: DataTypes.STRING,    
    laiSuat: DataTypes.DOUBLE,
    goi: DataTypes.DOUBLE
  }, {});
  LaiSuat.associate = function(models) {
    // associations can be defined here
    //LaiSuat.hasMany(models.Passbook,{foreignKey:"passbookId"});
  };
  return LaiSuat;
};
