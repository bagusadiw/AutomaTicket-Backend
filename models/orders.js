'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    idEvent: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
    orders.belongsTo(models.users, {
      as: 'orderedByUser',
      foreignKey: 'idUser'
    })
    orders.belongsTo(models.events, {
      as:'orderedEvent',
      foreignKey: 'idEvent'
    })
  };
  return orders;
};