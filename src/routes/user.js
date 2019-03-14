// const UserController = require('../controllers/user');

module.exports = (api, controllers) => {
	const UserController = controllers.get('UserController');

	api.route('/users').get(UserController.getAllUsers);
	//api.route('/users/:userId').get(UserController.getUser);
	//api.route('/users/:userId').put(UserController.editUser);
	api.route('/users/').post(UserController.addUser);
	//api.route('/users/:userId').delete(UserController.deleteUser);
};
