const mongoose 			= require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const ImageSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    uri: { type: String, trim: true, required: true }
}, { collection: 'images' });

ImageSchema.plugin(mongooseTimestamp);

module.exports = mongoose.model('Image', ImageSchema);
