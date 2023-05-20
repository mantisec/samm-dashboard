const env = {
  app_secret: process.env.APP_SECRET,
  database_name: process.env.DB_NAME,
  database_username: process.env.DB_USER,
  database_password: process.env.DB_PASS,
  database_host: process.env.DB_HOST,
  database_dialect: process.env.DB_DIALECT,
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;
