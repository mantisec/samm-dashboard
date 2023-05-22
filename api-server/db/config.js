const env = require('../config/env.js');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: env.database_host,
  user: env.database_username,
  password: env.database_password,
  database: env.database_name
});
connection.connect((err) => {
    if(err){
      console.log(err)
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });
module.exports = connection;
