'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Restaurant_Categories',
      foreignKey: 'categoryId',
      otherKey: 'restaurantId',
    }
    Category.belongsToMany(models.Restaurant, columnMapping);
  };
  return Category;
};
