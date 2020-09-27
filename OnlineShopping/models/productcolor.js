'use strict';
module.exports = (sequelize, DataTypes) => {
  const productColor = sequelize.define('productColor', {
    imagepath: DataTypes.TEXT
  }, {});
  productColor.associate = function (models) {
    // associations can be defined here
    productColor.belongsTo(models.product, {
      foreignKey: 'productId'
    });
    productColor.belongsTo(models.color, {
      foreignKey: 'colorId'
    });
  };
  return productColor;
};