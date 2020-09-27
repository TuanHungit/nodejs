'use strict';
module.exports = (sequelize, DataTypes) => {
  const productspecification = sequelize.define('productspecification', {
    description: DataTypes.TEXT
  }, {});
  productspecification.associate = function (models) {
    // associations can be defined here
    productspecification.belongsTo(models.product, {
      foreignKey: 'productId'
    });
    productspecification.belongsTo(models.specification, {
      foreignKey: 'specificationId'
    });
  };
  return productspecification;
};