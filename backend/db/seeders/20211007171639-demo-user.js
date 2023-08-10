'use strict';
const Chance = require('chance');
const chance = new Chance()

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require('bcryptjs');

function getRandomDate() {
  // Define the start and end dates
  const startDate = new Date(1980, 0, 1);  // January 1, 1980
  const endDate = new Date(2005, 11, 31);  // December 31, 2005

  // Calculate a random date between the start and end dates
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff + startDate.getTime();
  const randomDate = new Date(randomTime);

  // Format the date to 'mm/dd/yyyy'
  const month = ("0" + (randomDate.getMonth() + 1)).slice(-2);  // getMonth() returns 0-11, so we add 1
  const day = ("0" + randomDate.getDate()).slice(-2);  // getDate() returns 1-31
  const year = randomDate.getFullYear();

  return month + "/" + day + "/" + year;
}

const generateUsers = (amount) => {
  const userArr = [];

  const demoUser = {
    email: 'demo@user.io',
    username: 'Demo User',
    imgSrc: `${chance.avatar({protocol: 'https', fileExtension: 'png'})}`,
    zipCode: `${chance.zip()}`,
    birthday: '1995-02-04',
    hashedPassword: bcrypt.hashSync('password')
  }
  userArr.push(demoUser);

  for (let i = 0; i < amount; i++) {
    const fakeBirthday = getRandomDate();
    const userObj = {
      email: `${chance.email({domain: 'example.com'})}`,
      username: `${chance.first()} ${chance.last()}`,
      imgSrc: `${chance.avatar({protocol: 'https', fileExtension: 'png'})}`,
      zipCode: `${chance.zip()}`,
      birthday: `${fakeBirthday}`,
      hashedPassword: bcrypt.hashSync('password')
    }
    userArr.push(userObj)
  }
  return userArr;
}

const populate = [...generateUsers(5)]

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, populate, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, {});
  }
};
