'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant_Categories = sequelize.define('Restaurant_Categories', {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Restaurant_Categories.associate = function(models) {
    // associations can be defined here

  };
  return Restaurant_Categories;
};
