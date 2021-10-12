'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Restaurants', [
        {name: "Fog Harbor Fish House", location: "39 Pier Ste A-202 San Francisco, CA", phoneNumber: 4154212442, createdAt: new Date(), updatedAt: new Date()},
        {name: "Sotto Mare Oysteria & Seafood", location: "552 Green St San Francisco, CA", phoneNumber: 4153983181, createdAt: new Date(), updatedAt: new Date()},
        {name: "Hog Island Oyster Co", location: "1 Ferry Bldg Shop 11 San Francisco, CA", phoneNumber: 4153917117, createdAt: new Date(), updatedAt: new Date()},
        {name: "PPQ Dungeness Island - San Francisco", location: "2332 Clement St San Francisco, CA", phoneNumber: 4153868266, createdAt: new Date(), updatedAt: new Date()},
        {name: "Woodhouse Fish Company", location: "1914 Fillmore St San Francisco, CA", phoneNumber: 4154372722, createdAt: new Date(), updatedAt: new Date()},
        {name: "Nara Restaurant & Sake Bar", location: "518 Haight St San Francisco, CA", phoneNumber: 4156386124, createdAt: new Date(), updatedAt: new Date()},
        {name: "Tataki", location: "2827 California St San Francisco, CA", phoneNumber: 4159311182, createdAt: new Date(), updatedAt: new Date()},
        {name: "Ebisu", location: "1283 9th Ave San Francisco, CA", phoneNumber: 4155661770, createdAt: new Date(), updatedAt: new Date()},
        {name: "Ryoko's", location: "619 Taylor St San Francisco, CA", phoneNumber: 4157751028, createdAt: new Date(), updatedAt: new Date()},
        {name: "Besharam", location: "1275 Minnesota St San Francisco, CA", phoneNumber: 4155807662, createdAt: new Date(), updatedAt: new Date()},
        {name: "BAIA", location: "300 Grove St San Francisco, CA", phoneNumber: 4158610625, createdAt: new Date(), updatedAt: new Date()},
        {name: "Saucy Bandits", location: "1501 Cortland Ave San Francisco, CA", phoneNumber: 4159000514, createdAt: new Date(), updatedAt: new Date()},
        {name: "Above Ground", location: "2170 Mission St San Francisco, CA", phoneNumber: 4159349300, createdAt: new Date(), updatedAt: new Date()},
        {name: "Wildseed", location: "2000 Union St San Francisco, CA", phoneNumber: 4158727350, createdAt: new Date(), updatedAt: new Date()},
        {name: "Greens Restaurant", location: "2 Marina Blvd Bldg A Fort Mason San Francisco, CA", phoneNumber: 4157716222, createdAt: new Date(), updatedAt: new Date()},
        {name: "Oasis Cafe", location: "901 Divisadero St San Francisco, CA", phoneNumber: 4154744900, createdAt: new Date(), updatedAt: new Date()},
        {name: "Cha-Ya San Francisco", location: "762 Valencia St San Francisco, CA", phoneNumber: 4152527825, createdAt: new Date(), updatedAt: new Date()},
        {name: "Shizen Vegan Sushi Bar & Izakaya", location: "370 14th St San Francisco, CA", phoneNumber: 4156785767, createdAt: new Date(), updatedAt: new Date()},
        {name: "Lucky Creation Vegetarian Restaurant", location: "854 Washington St San Francisco, CA", phoneNumber: 4159890818, createdAt: new Date(), updatedAt: new Date()},
        {name: "VeganBurg", location: "1466 Haight St San Francisco, CA", phoneNumber: 4155488000, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
