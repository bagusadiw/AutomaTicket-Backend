'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    idUser: DataTypes.INTEGER,
    idEvent: DataTypes.INTEGER
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
   	favorites.belongsTo(models.users, {
      as: 'favoritedBy',
      foreignKey: 'idUser'
    })
    favorites.belongsTo(models.events, {
      as: 'favoritedEvent',
      foreignKey: 'idEvent'
    })
  };
  return favorites;
};