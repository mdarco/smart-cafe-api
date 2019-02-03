const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const UserGroupSchema = new mongoose.Schema({
	name: { type: String, trim: true, unique: true, required: true },
	description: { type: String, trim: true }
}, { collection: 'user-groups' });

UserGroupSchema.plugin(mongooseTimestamp);

UserGroupSchema.index({ name: 1 });

module.exports = mongoose.model('UserGroup', UserGroupSchema);
