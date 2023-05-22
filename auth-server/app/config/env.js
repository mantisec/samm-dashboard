const env = {
  app_secret: default_loader(process.env.APP_SECRET, 'shhhhhh'),
  app_port: default_loader(process.env.APP_PORT, 8000),
  api_server_uri: default_loader(process.env.API_SERVER_URI, ''),
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
  if(value!==undefined){
    //console.log('Loading value: ' + value)
    return value;
  }
  console.log('Substituting ' + value + ' with:' + default_value)
  return default_value;
}
module.exports = env;
