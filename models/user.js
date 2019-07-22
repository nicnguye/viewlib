module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    mail: DataTypes.STRING
  }, {});
  return User;
};
