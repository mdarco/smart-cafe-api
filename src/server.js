const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const winston = require('winston');
const compression = require('compression');
// const expressWinston	= require('express-winston');

const config = require('./config');
// import logger from './utils/logger';

const api = express();
const io = require('socket.io')(require('http').Server(api));

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

require('dotenv').config({ path: './.env' });

// api.use(
// 	jwt({ secret: config.jwt.secret }).unless({
// 		path: [
// 			'/',
// 			'/auth/signup',
// 			'/auth/login',
// 			'/auth/forgot-password',
// 			'/auth/reset-password'
// 		]
// 	})
// );

// api.use(
// 	expressWinston.logger({
// 		transports: [
// 			new winston.transports.Papertrail({
// 				host: config.logger.host,
// 				port: config.logger.port,
// 				level: 'error'
// 			})
// 		],
// 		meta: true
// 	})
// );

// ERROR middleware - should be always the last one
// api.use((err, req, res, next) => {
// 	if (err.name === 'UnauthorizedError') {
// 		res.status(401).send('Missing authentication credentials.');
// 	}
// });

// configure socket.io
require('./socket-io')(io);

api.get('/', (req, res) => {
	res.send('SmartCafe API v0.1');
});

api.listen(config.server.port, err => {
	if (err) {
		console.error('There was an error while starting the server:');
		console.error(err);
		process.exit(1);
	}

	console.log(`API is now running on port ${config.server.port} in ${config.env} mode...`);

	// establish DB connection
	require('./utils/db');

	// activate all routes
	fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
		require('./routes/' + file)(api);
	});
});

module.exports = api;
