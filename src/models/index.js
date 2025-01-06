const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port
});

const User = require('./userModel')(sequelize, DataTypes);
const URL = require('./urlModel')(sequelize, DataTypes);
// Add other models similarly
// const OtherModel = require('./otherModel')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  URL
};



module.exports = db;
