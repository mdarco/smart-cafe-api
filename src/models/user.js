const mongoose 			= require('mongoose');
const mongooseBcrypt 	= require('mongoose-bcrypt');
const mongooseTimestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
	code: { type: String, trim: true, index: true, unique: true, required: true },
	fullName: { type: String, trim: true, required: true },
	username: { type: String, trim: true, index: true, unique: true, required: true },
	password: { type: String, required: true, bcrypt: true },
	phone: { type: String, trim: true },
	email: { type: String, trim: true },
	note: { type: String, trim: true },
	userGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' }]
}, { collection: 'users' });

UserSchema.plugin(mongooseBcrypt);
UserSchema.plugin(mongooseTimestamp);

UserSchema.index({ code: 1, username: 1 });

module.exports = mongoose.model('User', UserSchema);
