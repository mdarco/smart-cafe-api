const mongoose 	= require('mongoose');
const config 	= require('../../config');

let connection = mongoose.connect(config.database.uri, { useNewUrlParser: true })
	.then(db => {
		console.log('Successfully connected to DB.');
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			console.log('Attempting to re-establish DB connection.');
			mongoose.connect(config.database.uri);
		} else {
			console.error('Error while attempting to connect to DB:');
			console.error(err);
		}
	});

module.exports = connection;
