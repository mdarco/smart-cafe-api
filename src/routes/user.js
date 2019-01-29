const UserController = require('../controllers/user');

module.exports = api => {
	api.route('/users').get(UserController.getAllUsers);
	//api.route('/users/:userId').get(UserController.getUser);
	//api.route('/users/:userId').put(UserController.editUser);
	api.route('/users/').post(UserController.addUser);
	//api.route('/users/:userId').delete(UserController.deleteUser);
};
