'use strict';
module.exports = (sequelize, DataTypes) => {  
  const CreditCard = sequelize.define('CreditCard', {
    cardNumber: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    used: DataTypes.BOOLEAN,
    issuingNetwork: DataTypes.STRING,
    expirationDate: DataTypes.DATEONLY,
    provideDate: DataTypes.DATEONLY,
  }, {});
  CreditCard.associate = function(models) {
    // associations can be defined here
    CreditCard.belongsTo(models.Account,{foreignKey:"accountId"});
  };
  return CreditCard;
};