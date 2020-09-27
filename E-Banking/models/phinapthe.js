'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhiNapThe = sequelize.define('PhiNapThe', {
    menhGia: DataTypes.INTEGER,
    chiPhi: DataTypes.INTEGER
  }, {});
  PhiNapThe.associate = function(models) {
    // associations can be defined here
  };
  return PhiNapThe;
};