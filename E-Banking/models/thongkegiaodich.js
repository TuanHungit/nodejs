'use strict';
module.exports = (sequelize, DataTypes) => {
  const ThongKeGiaoDich = sequelize.define('ThongKeGiaoDich', {
    month: DataTypes.STRING,    
    soGiaoDich: DataTypes.DOUBLE
  }, {});
  ThongKeGiaoDich.associate = function(models) {
  };
  return ThongKeGiaoDich;
};
