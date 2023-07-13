'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo User',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync('password'),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, {});
  }
};
