'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Ratings.associate = function(models) {
    // associations can be defined here
    Ratings.belongsTo(models.User, { foreignKey: 'userId' });
    Ratings.belongsTo(models.Restaurant, { foreignKey: 'restaurant' });
  };
  return Ratings;
};
