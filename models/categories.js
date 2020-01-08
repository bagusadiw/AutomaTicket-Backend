'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: DataTypes.STRING,
    urlImage: DataTypes.TEXT
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
    categories.hasMany(models.events, {
      as: 'categoryEvents',
      foreignKey: 'idCategory'
    })
  };
  return categories;
};