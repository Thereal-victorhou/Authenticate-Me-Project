'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant_Category = sequelize.define('Restaurant_Category', {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Restaurant_Category.associate = function(models) {
    // associations can be defined here

  };
  return Restaurant_Category;
};
