'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GiaHans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      soThe: {
        type: Sequelize.STRING
      },
      loaiThe: {
        type: Sequelize.STRING
      },
      soThang: {
        type: Sequelize.INTEGER
      },
      chiPhi: {
        type: Sequelize.DOUBLE
      },
      accountId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GiaHans');
  }
};