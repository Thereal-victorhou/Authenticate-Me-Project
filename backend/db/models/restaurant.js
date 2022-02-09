'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgSrc: {
      type: DataTypes.STRING,
      allowNull: false,
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

    Restaurant.hasMany(models.Photo, { foreignKey: 'restaurantId' });
    Restaurant.hasMany(models.Review, { foreignKey: 'restaurantId' });
    Restaurant.hasMany(models.Rating, { foreignKey: 'restaurantId' });
    Restaurant.belongsToMany(models.Category, columnMapping);
    // Restaurant.belongsToMany(models.User, columnMapping2);
  };
  return Restaurant;
};
