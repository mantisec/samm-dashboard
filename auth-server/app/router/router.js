var env = require('../config/env')
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function (app) {

	const controller = require('../controller/controller.js');

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	app.post(env.api_server_uri + '/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

	app.post(env.api_server_uri + '/api/auth/signin', controller.signin);

	app.get(env.api_server_uri + '/api/test/user', [authJwt.verifyToken], controller.userContent);

	app.get(env.api_server_uri + '/api/test/auditor', [authJwt.verifyToken, authJwt.isauditorOrAdmin], controller.managementBoard);

  app.get(env.api_server_uri + '/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}
