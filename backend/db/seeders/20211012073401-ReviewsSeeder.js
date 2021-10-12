'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Reviews', [
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: Math.floor(Math.random() * 10) + 1, restaurantId: Math.floor(Math.random() * 20) + 1, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
