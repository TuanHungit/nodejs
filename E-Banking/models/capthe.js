'use strict';
module.exports = (sequelize, DataTypes) => {
  const CapThe = sequelize.define('CapThe', {
    typeCard: DataTypes.STRING,
    message: DataTypes.STRING,
    daCap: DataTypes.BOOLEAN
  }, {});
  CapThe.associate = function(models) {
    // associations can be defined here
    CapThe.belongsTo(models.Account,{foreignKey:"accountId"});
  };
  return CapThe;
};