const validator = require('validator');
const httpStatus = require('http-status');
const User = require('../models/user');

exports.getAllUsers = (req, res) => {
	UserModel.find({}).exec(
		(err, users) => {
			if (err) {
				console.error(err);
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).json(users);
			}
		}
	);
};

// exports.getUser = (req, res) => {
// 	User.findById(req.params.userId)
// 		.then(user => {
// 			user.password = undefined;
// 			user.recoveryCode = undefined;

// 			res.json(user);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

// exports.editUser = (req, res) => {
// 	const data = req.body || {};

// 	if (data.email && !validator.isEmail(data.email)) {
// 		return res.status(422).send('Invalid email address.');
// 	}

// 	if (data.username && !validator.isAlphanumeric(data.username)) {
// 		return res.status(422).send('Usernames must be alphanumeric.');
// 	}

// 	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			user.password = undefined;
// 			user.recoveryCode = undefined;

// 			res.json(user);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

exports.addUser = (req, res) => {
	const data = Object.assign({}, req.body) || null;
	if (!data) {
		console.log('Tried to create empty user.');
		res.status(httpStatus.NO_CONTENT).send('Tried to create empty user.');
	} else {
		User.create(data)
			.then(user => { res.json(user); })
			.catch(err => {
				console.error(err);
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			});
	}
};

// exports.deleteUser = (req, res) => {
// 	User.findByIdAndUpdate(
// 		{ _id: req.params.user },
// 		{ active: false },
// 		{
// 			new: true
// 		}
// 	)
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			res.sendStatus(204);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };
