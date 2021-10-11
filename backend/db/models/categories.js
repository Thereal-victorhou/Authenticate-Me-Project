'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Restaurant_Categories',
      foreignKey: 'categoryId',
      otherKey: 'restaurantId',
    }
    Categories.belongsToMany(models.Restaurant, columnMapping);
  };
  return Categories;
};
