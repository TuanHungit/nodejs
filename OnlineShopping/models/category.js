'use strict';
module.exports = (sequelize, DataTypes) => {
  const Catelogy = sequelize.define('category', {
    name: DataTypes.STRING,
    sumary: DataTypes.TEXT,
    imagepath: DataTypes.TEXT
  }, {});
  Catelogy.associate = function (models) {
    // associations can be defined here
    Catelogy.hasMany(models.product, {
      foreignKey: 'categoryId'
    })
  };
  return Catelogy;
};