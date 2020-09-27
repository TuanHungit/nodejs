"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [{
            name: "Apple"
        }, {
            name: "Asus"
        }, {
            name: "Gionee"
        }, {
            name: "Micromax"
        }, {
            name: "Samsung"
        }]
        data.map(el => {
            el.createdAt = Sequelize.literal("NOW()");
            el.updatedAt = Sequelize.literal("NOW()");
        });
        return queryInterface.bulkInsert("brands", data, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};