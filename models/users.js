'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    img: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.orders, {
      as: 'userOrders',
      foreignKey: 'idUser'
    })
    users.hasMany(models.events, {
      as:'userEvents',
      foreignKey: 'createdBy'
    })
    users.hasMany(models.favorites, {
      as: 'userFavorites',
      foreignKey: 'idUser'
    })
  };
  return users;
};