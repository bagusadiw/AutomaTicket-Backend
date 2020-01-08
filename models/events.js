'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    title: DataTypes.STRING,
    idCategory: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    urlMaps: DataTypes.STRING,
    img: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  events.associate = function(models) {
    // associations can be defined here
    events.belongsTo(models.categories, {
      as: 'eventCategory',
      foreignKey: 'idCategory'
    })
    events.belongsTo(models.users, {
      as: 'eventCreator',
      foreignKey: 'createdBy'
    })
    events.hasMany(models.orders, {
      as: 'eventOrders',
      foreignKey: 'idEvent'
    })
    events.hasMany(models.favorites, {
      as: 'eventFavorites',
      foreignKey: 'idEvent'
    })
  };
  return events;
};