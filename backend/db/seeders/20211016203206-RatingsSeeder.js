'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Ratings', [
        {rating: 5, userId: 1, restaurantId: 1, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 1, restaurantId: 2, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 1, restaurantId: 3, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 1, restaurantId: 4, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 1, restaurantId: 5, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 2, restaurantId: 6, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 2, restaurantId: 7, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 2, restaurantId: 8, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 2, restaurantId: 9, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 2, restaurantId: 10, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 3, restaurantId: 11, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 3, restaurantId: 12, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 3, restaurantId: 13, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 3, restaurantId: 14,createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 3, restaurantId: 15, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 4, restaurantId: 16, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 4, restaurantId: 17, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 4, restaurantId: 18, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 4, restaurantId: 19, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 4, restaurantId: 20, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 4, restaurantId: 1, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 5, restaurantId: 2, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 5, restaurantId: 3, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 5, restaurantId: 4, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 5, restaurantId: 5, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 5, restaurantId: 6, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 6, restaurantId: 7, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 6, restaurantId: 8, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 6, restaurantId: 9, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 6, restaurantId: 10, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 7, restaurantId: 11, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 7, restaurantId: 12, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 7, restaurantId: 13, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 7, restaurantId: 14, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 7, restaurantId: 15, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 8, restaurantId: 16, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 8, restaurantId: 17, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 8, restaurantId: 18, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 8, restaurantId: 19, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 8, restaurantId: 20, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 8, restaurantId: 1, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 9, restaurantId: 2, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 9, restaurantId: 3, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 9, restaurantId: 4, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 9, restaurantId: 5, createdAt: new Date(), updatedAt: new Date()},
        {rating: 5, userId: 9, restaurantId: 6, createdAt: new Date(), updatedAt: new Date()},
        {rating: 1, userId: 10, restaurantId: 7, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 10, restaurantId: 8, createdAt: new Date(), updatedAt: new Date()},
        {rating: 4, userId: 10, restaurantId: 9, createdAt: new Date(), updatedAt: new Date()},
        {rating: 3, userId: 10, restaurantId: 10, createdAt: new Date(), updatedAt: new Date()},

      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Ratings', null, {});
  }
};
