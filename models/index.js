const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const CONFIG = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(CONFIG.database, CONFIG.username, CONFIG.password, {
  host: CONFIG.host,
  dialect: CONFIG.dialect,
  port: CONFIG.port,
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 1000
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
