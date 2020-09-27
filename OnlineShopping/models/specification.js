'use strict';
module.exports = (sequelize, DataTypes) => {
  const specification = sequelize.define('specification', {
    name: DataTypes.STRING,
    summary: DataTypes.TEXT
  }, {});
  specification.associate = function (models) {
    // associations can be defined here
    specification.hasMany(models.productspecification, {
      foreignKey: 'specificationId'
    })
  };
  return specification;
};