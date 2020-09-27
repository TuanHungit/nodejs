"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [{
            "name": "Goldenrod",
            "code": "#a387bd",
            "imagepath": "http://dummyimage.com/145x154.bmp/ff4444/ffffff"
        }, {
            "name": "Green",
            "code": "#d9d8ec",
            "imagepath": "http://dummyimage.com/188x237.jpg/dddddd/000000"
        }, {
            "name": "Khaki",
            "code": "#b2f0b2",
            "imagepath": "http://dummyimage.com/232x210.jpg/cc0000/ffffff"
        }, {
            "name": "Yellow",
            "code": "#252fdb",
            "imagepath": "http://dummyimage.com/176x154.bmp/cc0000/ffffff"
        }, {
            "name": "Red",
            "code": "#111688",
            "imagepath": "http://dummyimage.com/205x143.jpg/5fa2dd/ffffff"
        }, {
            "name": "Blue",
            "code": "#076dd4",
            "imagepath": "http://dummyimage.com/112x196.jpg/ff4444/ffffff"
        }, {
            "name": "Puce",
            "code": "#385813",
            "imagepath": "http://dummyimage.com/235x122.png/dddddd/000000"
        }]
        data.map(el => {
            el.createdAt = Sequelize.literal("NOW()");
            el.updatedAt = Sequelize.literal("NOW()");
        });
        return queryInterface.bulkInsert("colors", data, {});
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