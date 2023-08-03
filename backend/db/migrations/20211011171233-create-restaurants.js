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
        unique: true,
      },
      location: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING(14),
        unique: true,
      },
      imgSrc: {
        type: Sequelize.STRING,
        allowNull: false,
      },reviewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      coordinates: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      displayPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      distance: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      region: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      yelpId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
