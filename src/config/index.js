require('dotenv').config({ path: './.env' });

module.exports = {
	env: process.env.NODE_ENV || 'development',

	server: {
		port: 5000
	},

	database: {
		uri: 'mongodb://mdarco:Hitachi.2301@darco-cluster-shard-00-00-qs3nv.mongodb.net:27017,darco-cluster-shard-00-01-qs3nv.mongodb.net:27017,darco-cluster-shard-00-02-qs3nv.mongodb.net:27017/smart-cafe?ssl=true&replicaSet=darco-cluster-shard-0&authSource=admin&retryWrites=true'
	},

	logger: {
		// host: process.env.LOGGER_HOST, // Papertrail Logging Host
		// port: process.env.LOGGER_PORT, // Papertrail Logging Port
	},

	// email: {
	// 	sender: {
	// 		default: {
	// 			name: process.env.EMAIL_SENDER_DEFAULT_NAME, // Your Name
	// 			email: process.env.EMAIL_SENDER_DEFAULT_EMAIL, // nick@your-domain.com
	// 		},
	// 		support: {
	// 			name: process.env.EMAIL_SENDER_SUPPORT_NAME, // API Support
	// 			email: process.env.EMAIL_SENDER_SUPPORT_EMAIL, // support@your-domain.com
	// 		},
	// 	},

	// 	sendgrid: {
	// 		secret: process.env.EMAIL_SENDGRID_SECRET, // SendGrid API Secret
	// 	},
	// },
	
	// stream: {
	// 	appId: process.env.STREAM_APP_ID, // Stream Credentials – https://getstream.io
	// 	apiKey: process.env.STREAM_API_KEY, // Stream Credentials – https://getstream.io
	// 	apiSecret: process.env.STREAM_API_SECRET, // Stream Credentials – https://getstream.io
	// },
};
