const env = require('../config/env.js');
const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize(env.database_name, env.database_username, env.database_password, {
  host: env.database_host,
  dialect: env.database_dialect,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

