const env = {
  app_secret: default_loader(process.env.APP_SECRET, 'shhhhhh'),
  database_name: default_loader(process.env.DB_NAME, 'samm'),
  database_username: default_loader(process.env.DB_USER, 'root'),
  database_password: default_loader(process.env.DB_PASS, 'root'),
  database_host: default_loader(process.env.DB_HOST, 'samm-db'),
  database_dialect: default_loader(process.env.DB_DIALECT, 'mysql'),
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
function default_loader(value, default_value){
  if(value){
    return value;
  }
  return default_value;
}
module.exports = env;
