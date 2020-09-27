'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhiDuyTriThe = sequelize.define('PhiDuyTriThe', {
    soThang: DataTypes.INTEGER,
    chiPhi: DataTypes.DOUBLE,
    giamGia: DataTypes.STRING
  }, {});
  PhiDuyTriThe.associate = function(models) {
    // associations can be defined here
  };
  return PhiDuyTriThe;
};