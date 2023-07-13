'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Restaurants';
      return queryInterface.bulkInsert(options, [
        {name: "Fog Harbor Fish House", location: "39 Pier Ste A-202 San Francisco, CA", phoneNumber: 4154212442, imgSrc:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hcTbtNnqX7wLKR6LOFBXRwHaE8%26pid%3DApi&f=1', userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {name: "Sotto Mare Oysteria & Seafood", location: "552 Green St San Francisco, CA", phoneNumber: 4153983181, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/o3hIcGLMxV_5ynxEjGWGrw/o.jpg', userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {name: "Hog Island Oyster Co", location: "1 Ferry Bldg Shop 11 San Francisco, CA", phoneNumber: 4153917117, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/4avfA7HWOW_Bl0J_8J60rg/o.jpg', userId: 2, createdAt: new Date(), updatedAt: new Date()},
        {name: "PPQ Dungeness Island - San Francisco", location: "2332 Clement St San Francisco, CA", phoneNumber: 4153868266, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/jDCULB0yrZuQRmwrJ5slqQ/o.jpg', userId: 2, createdAt: new Date(), updatedAt: new Date()},
        {name: "Woodhouse Fish Company", location: "1914 Fillmore St San Francisco, CA", phoneNumber: 4154372722, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/CyWsb4yNXpF1g12S9kZDew/o.jpg', userId: 3, createdAt: new Date(), updatedAt: new Date()},
        {name: "Nara Restaurant & Sake Bar", location: "518 Haight St San Francisco, CA", phoneNumber: 4156386124, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/Fy7WXvspf_Pj6pH-e4r1-Q/o.jpg', userId: 3, createdAt: new Date(), updatedAt: new Date()},
        {name: "Tataki", location: "2827 California St San Francisco, CA", phoneNumber: 4159311182, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/sgUQ-3AemEzng0qS0Zn0BA/o.jpg', userId: 4, createdAt: new Date(), updatedAt: new Date()},
        {name: "Ebisu", location: "1283 9th Ave San Francisco, CA", phoneNumber: 4155661770, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/h1SVVb7Stz0cAJaAaVwtLA/o.jpg', userId: 4, createdAt: new Date(), updatedAt: new Date()},
        {name: "Ryoko's", location: "619 Taylor St San Francisco, CA", phoneNumber: 4157751028, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/Cc1_NVzUAbPIRvBL0VF_ow/o.jpg', userId: 5, createdAt: new Date(), updatedAt: new Date()},
        {name: "Besharam", location: "1275 Minnesota St San Francisco, CA", phoneNumber: 4155807662, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/IO99Gk20y3n0WNTFjpdmpQ/o.jpg', userId: 5, createdAt: new Date(), updatedAt: new Date()},
        {name: "BAIA", location: "300 Grove St San Francisco, CA", phoneNumber: 4158610625, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/GIoBcpTeZ0AcDvLaJ_volQ/o.jpg', userId: 6, createdAt: new Date(), updatedAt: new Date()},
        {name: "Saucy Bandits", location: "1501 Cortland Ave San Francisco, CA", phoneNumber: 4159000514, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/wh9QEwEYTK12VZawGIBMuQ/o.jpg', userId: 6, createdAt: new Date(), updatedAt: new Date()},
        {name: "Above Ground", location: "2170 Mission St San Francisco, CA", phoneNumber: 4159349300, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/JaKhtALm9tF0keKP7RNWWg/o.jpg', userId: 7, createdAt: new Date(), updatedAt: new Date()},
        {name: "Wildseed", location: "2000 Union St San Francisco, CA", phoneNumber: 4158727350, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/aAep2igrF5dVq5GgWahvIg/o.jpg', userId: 7, createdAt: new Date(), updatedAt: new Date()},
        {name: "Greens Restaurant", location: "2 Marina Blvd Bldg A Fort Mason San Francisco, CA", phoneNumber: 4157716222, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/3ZZTHtmY6Sx2lE28CwZmSw/o.jpg', userId: 8, createdAt: new Date(), updatedAt: new Date()},
        {name: "Oasis Cafe", location: "901 Divisadero St San Francisco, CA", phoneNumber: 4154744900, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/faTmvzMVqD_X0XHN5xk40A/o.jpg', userId: 8, createdAt: new Date(), updatedAt: new Date()},
        {name: "Cha-Ya San Francisco", location: "762 Valencia St San Francisco, CA", phoneNumber: 4152527825, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/MNWfVHKGj83qq94DpK2X3g/o.jpg', userId: 9, createdAt: new Date(), updatedAt: new Date()},
        {name: "Shizen Vegan Sushi Bar & Izakaya", location: "370 14th St San Francisco, CA", phoneNumber: 4156785767, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/xgwxz4jgfMT13N8ToH_gyg/o.jpg', userId: 9, createdAt: new Date(), updatedAt: new Date()},
        {name: "Lucky Creation Vegetarian Restaurant", location: "854 Washington St San Francisco, CA", phoneNumber: 4159890818, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/TlKTi7IMgbySTPAD-wZ5-A/o.jpg', userId: 10, createdAt: new Date(), updatedAt: new Date()},
        {name: "VeganBurg", location: "1466 Haight St San Francisco, CA", phoneNumber: 4155488000, imgSrc:'https://s3-media0.fl.yelpcdn.com/bphoto/VgggiYW4RMEzPqOW2QK9zg/o.jpg', userId: 10, createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Restaurants';
    return queryInterface.bulkDelete(options, null, {});
  }
};
