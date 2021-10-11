'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurants = sequelize.define('Restaurants', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Restaurants.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Restaurant_Categories',
      foreignKey: 'restaurantId',
      otherKey: 'categoryId'
    }
    Restaurants.hasMany(models.Photo, { foreignKey: 'restaurantId' });
    Restaurants.hasMany(models.Review, { foreignKey: 'restaurantId' });
    Restaurants.hasMany(models.Rating, { foreignKey: 'restaurantId' });
    Restaurants.belongsToMany(models.Category, columnMapping);
  };
  return Restaurants;
};
