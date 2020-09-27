'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    message: DataTypes.TEXT
  }, {});
  comment.associate = function (models) {
    // associations can be defined here

    comment.belongsTo(models.user, {
      foreignKey: 'userId'
    });
    comment.belongsTo(models.product, {
      foreignKey: 'productId'
    });

    comment.belongsTo(models.comment, {
      as: 'parentComment',
      foreignKey: 'parentCommentId'
    });

    comment.hasMany(models.comment, {
      as: 'subComments',
      foreignKey: 'parentCommentId'
    });
  };
  return comment;
};