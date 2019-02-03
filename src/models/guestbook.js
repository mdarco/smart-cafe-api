const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const GuestbookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String, trim: true },
    entryDate: { type: Date, required: true }
}, { collection: 'guestbook' });

GuestbookSchema.plugin(mongooseTimestamp);

module.exports = mongoose.model('Guestbook', GuestbookSchema);
