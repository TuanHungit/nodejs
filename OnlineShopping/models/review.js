'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    message: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {});
  review.associate = function (models) {
    // associations can be defined here
    review.belongsTo(models.user, {
      foreignKey: 'reviewId'
    });
    review.belongsTo(models.product, {
      foreignKey: 'reviewId'
    });
  };
  return review;
};