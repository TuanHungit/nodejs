"use strict";
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "brand", {
      name: DataTypes.STRING,
      sumary: DataTypes.TEXT,
      imagepath: DataTypes.TEXT
    }, {}
  );
  Brand.associate = function (models) {
    // associations can be defined here
    Brand.hasMany(models.product, {
      foreignKey: "brandId"
    });
  };
  return Brand;
};