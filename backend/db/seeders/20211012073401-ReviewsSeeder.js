'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Reviews', [
        {body: "Amazing food!!", userId: 1, restaurantId: 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 1, restaurantId: 2, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 1, restaurantId: 3, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 1, restaurantId: 4, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 1, restaurantId: 5, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 2, restaurantId: 6, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 2, restaurantId: 7, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 2, restaurantId: 8, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 2, restaurantId: 9, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 2, restaurantId: 10, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 3, restaurantId: 11, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 3, restaurantId: 12, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 3, restaurantId: 13, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 3, restaurantId: 14, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 3, restaurantId: 15, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 4, restaurantId: 16, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 4, restaurantId: 17, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 4, restaurantId: 18, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 4, restaurantId: 20, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 4, restaurantId: 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 5, restaurantId: 2, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 5, restaurantId: 3, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 5, restaurantId: 4, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 5, restaurantId: 5, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 5, restaurantId: 6, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 6, restaurantId: 7, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 6, restaurantId: 8, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 6, restaurantId: 9, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 6, restaurantId: 10, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 6, restaurantId: 11, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 7, restaurantId: 12, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 7, restaurantId: 13, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 7, restaurantId: 14, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 7, restaurantId: 15, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 7, restaurantId: 16, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 8, restaurantId: 17, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 8, restaurantId: 18, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 8, restaurantId: 19, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 8, restaurantId: 20, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 8, restaurantId: 1, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 9, restaurantId: 2, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 9, restaurantId: 3, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 9, restaurantId: 4, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 9, restaurantId: 5, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 9, restaurantId: 6, createdAt: new Date(), updatedAt: new Date()},
        {body: "Amazing food!!", userId: 10, restaurantId: 7, createdAt: new Date(), updatedAt: new Date()},
        {body: "God awful!", userId: 10, restaurantId: 8, createdAt: new Date(), updatedAt: new Date()},
        {body: "Great Service!", userId: 10, restaurantId: 9, createdAt: new Date(), updatedAt: new Date()},
        {body: "Lovely atmosphere!", userId: 10, restaurantId: 10, createdAt: new Date(), updatedAt: new Date()},
        {body: "It was alright", userId: 10, restaurantId: 11, createdAt: new Date(), updatedAt: new Date()},

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
