'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NapThes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MenhGia: {
        type: Sequelize.INTEGER
      },
      nhaMang: {
        type: Sequelize.STRING
      },
      chiPhi: {
        type: Sequelize.INTEGER
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      seri: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('NapThes');
  }
};