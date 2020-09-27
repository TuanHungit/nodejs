'use strict';
module.exports = (sequelize, DataTypes) => {
  const Passbook = sequelize.define('Passbook', {
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    period: DataTypes.DOUBLE,
    goi: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN,
    tienLai: DataTypes.DOUBLE
  }, {});
  Passbook.associate = function(models) {
    // associations can be defined here
    Passbook.belongsTo(models.User,{foreignKey:"userId"});
  //  Passbook.belongsTo(models.LaiSuat,{foreignKey:"laisuatId"});
  };
  return Passbook;
};