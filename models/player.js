module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  return Player;
};
