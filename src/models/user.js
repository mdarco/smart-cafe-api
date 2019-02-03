const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	code: { type: String, trim: true },
	fullName: { type: String, trim: true, required: true },
	username: { type: String, trim: true, index: true, unique: true, required: true },
	password: { type: String, required: true },
	phone: { type: String, trim: true },
	email: { type: String, trim: true },
	note: { type: String, trim: true },
	userGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' }]
}, { collection: 'users' });

UserSchema.pre('save', async function(next) {
    // hash password
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(this.password, salt);
	this.password = hashPassword;
});

UserSchema.plugin(mongooseTimestamp);

UserSchema.index({ code: 1, username: 1 });

module.exports = mongoose.model('User', UserSchema);
