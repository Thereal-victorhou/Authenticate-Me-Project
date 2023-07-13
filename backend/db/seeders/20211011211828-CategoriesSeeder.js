'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Categories';
      return queryInterface.bulkInsert(options, [
        {type: "Pescatarian", createdAt: new Date(), updatedAt: new Date()},
        {type: "Vegetarian", createdAt: new Date(), updatedAt: new Date()},
        {type: "Vegan", createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Categories';
    return queryInterface.bulkDelete(options, null, {});
  }
};
