'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING(1000),
    imagePath: DataTypes.TEXT,
    thumbnailPath: DataTypes.TEXT,
    availability: DataTypes.BOOLEAN,
    summary: DataTypes.TEXT(1000),
    reviewCount: DataTypes.INTEGER,
    overallReview: DataTypes.INTEGER
  }, {});
  product.associate = function (models) {
    // associations can be defined here
    product.belongsTo(models.category, {
      foreignKey: 'categoryId'
    });
    product.belongsTo(models.brand, {
      foreignKey: 'brandId'
    });
    product.hasMany(models.productColor, {
      foreignKey: 'productId'
    });
    product.hasMany(models.productspecification, {
      foreignKey: 'productId'
    })
    product.hasMany(models.comment, {
      foreignKey: 'productId'
    });
    product.hasMany(models.review, {
      foreignKey: 'productId'
    })
  };
  return product;
};