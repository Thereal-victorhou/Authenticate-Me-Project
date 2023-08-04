'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewBody = {
  '1': 'God awful!',
  '2': 'It was alright',
  '3': 'Lovely atmosphere!',
  '4': 'Great Service!',
  '5': 'Amazing food!!!',
}


function getRandomNum(min, max) {
  const raw = Math.random() * (max - min) + min;
  return Math.floor(raw);
}

function makeReviews(target) {
  const reviews = [];
  for (let i = 2; i <= target; i++) {
    const randomNum = getRandomNum(1, 6);

    const newReview = {
      body: reviewBody[String(randomNum)],
      userId: getRandomNum(1, 5),
      restaurantId: getRandomNum(1, 28),
      rating: randomNum,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    reviews.push(newReview);
  }
  return reviews;
}

const seedReviews = [
  ...makeReviews(100),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, seedReviews, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
