'use strict';
module.exports = (sequelize, DataTypes) => {
  const color = sequelize.define('color', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    imagepath: DataTypes.TEXT
  }, {});
  color.associate = function (models) {
    // associations can be defined here
    color.hasMany(models.productColor, {
      foreignKey: 'colorId'
    })
  };
  return color;
};