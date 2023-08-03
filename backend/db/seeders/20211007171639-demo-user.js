'use strict';
import { faker } from '@faker-js/faker';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require('bcryptjs');

const generateUsers = (amount) => {
  const userArr = [];

  const demoUser = {
    email: 'demo@user.io',
    username: 'Demo User',
    imgUrl: faker.image.avatar(),
    zipCode: faker.location.zipCode(),
    birthday: '1995-02-04',
    hashedPassword: bcrypt.hashSync('password')
  }

  userArr.push(demoUser);

  for (let i = 0; i < amount; i++) {
    const fakeBirthday = faker.date.birthdate({ min: 1900, max: 2000, mode: 'year' });
    const fakeDate = fakeBirthday.split('T')[0];
    const userObj = {
      email: faker.internet.email(),
      username: faker.person.fullName(),
      imgUrl: faker.image.avatar(),
      zipCode: faker.location.zipCode(),
      birthday: fakeDate,
      hashedPassword: bcrypt.hashSync('password')
    }
    userArr.push(userObj)
  }
  return userArr;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, generateUsers(50), {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, {});
  }
};
