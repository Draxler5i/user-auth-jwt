const { Sequelize } = require('sequelize');
const config = require('../config/config');
const UserModel = require('./user.model');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging === false ? false : console.log,
    dialectOptions: dbConfig.dialectOptions || {}
  }
);

const db = {
  User: UserModel(sequelize),
  sequelize,
  Sequelize
};

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = db;
