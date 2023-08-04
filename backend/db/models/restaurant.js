'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgSrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    region: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    yelpId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    }
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Restaurant_Categories',
      foreignKey: 'restaurantId',
      otherKey: 'categoryId'
    }

    // const columnMapping2 = {
    //   through: 'Reviews',
    //   foreignKey: 'restaurantId',
    //   otherKey: 'userId'
    // }

    Restaurant.hasMany(models.Review, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
    Restaurant.hasMany(models.Photo, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
    Restaurant.hasMany(models.Rating, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
    Restaurant.belongsToMany(models.Category, columnMapping);
    // Restaurant.belongsToMany(models.User, columnMapping2);
  };
  return Restaurant;
};
