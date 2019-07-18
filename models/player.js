'use strict';

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};