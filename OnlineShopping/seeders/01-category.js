"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
        name: "Men",
        imagepath: "/img/home/hero-slide1.png"
      },
      {
        name: "Women",
        imagepath: "/img/home/hero-slide2.png"
      },
      {
        name: "Accessories",
        imagepath: "/img/home/hero-slide3.png"
      },
      {
        name: "Footware",
        imagepath: "/img/home/hero-slide1.png"
      },
      {
        name: "Bay item",
        imagepath: "/img/home/hero-slide2.png"
      },
      {
        name: "Electronics",
        imagepath: "/img/home/hero-slide3.png"
      },
      {
        name: "Food",
        imagepath: "/img/home/hero-slide1.png"
      }
    ];
    data.map(el => {
      el.createdAt = Sequelize.literal("NOW()");
      el.updatedAt = Sequelize.literal("NOW()");
    });
    return queryInterface.bulkInsert("categories", data, {});
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