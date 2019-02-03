module.exports = {
	env: process.env.NODE_ENV || 'development',

	server: {
		port: 5000
	},

	database: {
		uri: 'mongodb://mdarco:Hitachi.2301@darco-cluster-shard-00-00-qs3nv.mongodb.net:27017,darco-cluster-shard-00-01-qs3nv.mongodb.net:27017,darco-cluster-shard-00-02-qs3nv.mongodb.net:27017/smart-cafe?ssl=true&replicaSet=darco-cluster-shard-0&authSource=admin&retryWrites=true',

		seed: {
			productCategories: {
				add: false,
				delete: false
			},

			products: {
				add: false,
				delete: false
			},

			orders: {
				add: false,
				delete: false
			},

			tables: {
				add: false,
				delete: false
			},
			
			usersAndGroups: {
				add: false,
				delete: false
			}
		},

		seedData: {
			productCategories: [
				{ name: 'Piće' },
				{ name: 'Hrana' },
				{ name: 'Cigarete' }
			],

			productSubCategories: [
				{ name: 'Topli napici', category: 'Piće' },
				{ name: 'Bezalkoholna pića', category: 'Piće' },
				{ name: 'Žestoka pića', category: 'Piće' },
				{ name: 'Piva', category: 'Piće' },
				{ name: 'Vina', category: 'Piće' },
				{ name: 'Doručak', category: 'Hrana' },
				{ name: 'Predjela', category: 'Hrana' },
				{ name: 'Glavna jela', category: 'Hrana' },
				{ name: 'Paste', category: 'Hrana' },
				{ name: 'Desert', category: 'Hrana' },
				{ name: 'Marlboro', category: 'Cigarete' },
				{ name: 'Pall Mall', category: 'Cigarete' }
			],

			tables: [
				{ tag: 'Sto br. 2', description: 'Sto za pušače' },
				{ tag: 'Sto br. 3', description: 'Sto za ručak' },
				{ tag: 'Sto br. 1', description: 'Sto za nepušače' }
			],

			userGroups: [
				{ name: 'ADMIN' },
				{ name: 'KONOBAR' },
				{ name: 'MENADZER' }
			],

			users: [
				{ 
					fullName: 'Darko Milutinović',
					username: 'mdarco',
					password: 'hitachi',
					phone: '12345',
					email: 'dmilutinovic@gmail.com',
					note: 'The King',
					userGroups: ['ADMIN']
				}
			]
		}
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
