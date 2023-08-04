'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: false,
      },
      location: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: false,
      },
      imgSrc: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        unique: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: false,
      },
      coordinates: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      displayPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      distance: {
        type: Sequelize.FLOAT,
        allowNull: true,
        unique: false,
      },
      region: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: false,
      },
      yelpId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Restaurants', options);
  }
};
