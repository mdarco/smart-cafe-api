const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const TableSchema = new mongoose.Schema({
    tag: { type: String, unique: true, required: true },
    description: { type: String, trim: true }
}, { collection: 'tables' });

TableSchema.plugin(mongooseTimestamp);

TableSchema.index({ tag: 1 });

module.exports = mongoose.model('Table', TableSchema);
