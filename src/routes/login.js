// const LoginController = require('../controllers/login');

module.exports = (api, controllers) => {
	const LoginController = controllers.get('LoginController');

	api.route('/login/').post(LoginController.login);
};
