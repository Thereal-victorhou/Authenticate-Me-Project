'use strict';

const reviewBody = [
  null,
  "God awful!",
  "It was alright",
  "Great Service!",
  "Lovely atmosphere!",
  "Amazing food!!!",
];

function getRandomNum(min, max) {
  const raw = Math.random() * (max - min) + min;
  return Math.floor(raw);
}

function makeReviews(target) {
  const reviews = [];
  for (let i = 2; i <= target; i++) {
    const randomNum = getRandomNum(1, 6);
    const newReview = {
        body: reviewBody[randomNum],
      userId: getRandomNum(1, 10),
      restaurantId: getRandomNum(1, 20),
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
      return queryInterface.bulkInsert('Reviews', seedReviews, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
