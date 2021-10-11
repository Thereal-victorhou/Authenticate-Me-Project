'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Photos.associate = function(models) {
    // associations can be defined here
    Photos.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
  };
  return Photos;
};
