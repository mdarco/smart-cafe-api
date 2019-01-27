const mongoose 			= require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, trim: true },
    categoryId: [{ type: Schema.Types.ObjectId, ref: 'ProductCategory' }],
    subCategoryId: [{ type: Schema.Types.ObjectId, ref: 'ProductSubCategory' }],
    priceWithVAT: { type: Number, required: true },
    isRecommended: { type: Boolean, required: true },
    isRecommended: { type: Boolean, required: true },
    isPromo: { type: Boolean, required: true },
    allergens: [String]
}, { collection: 'products' });

ProductSchema.plugin(mongooseTimestamp);

ProductSchema.index({ name: 1 });

module.exports = mongoose.model('Product', ProductSchema);
