const LoginController = require('../controllers/login');

module.exports = api => {
	api.route('/login/').post(LoginController.login);
};
