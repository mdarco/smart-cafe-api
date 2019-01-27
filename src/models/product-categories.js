const mongoose 			= require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const ProductCategorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, trim: true }
}, { collection: 'product-categories' });

ProductCategorySchema.plugin(mongooseTimestamp);

const ProductSubCategorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, trim: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true }
}, { collection: 'product-sub-categories' });

ProductSubCategorySchema.plugin(mongooseTimestamp);

module.exports = { 
    ProductCategory: mongoose.model('ProductCategory', ProductCategorySchema),
    ProductSubCategory: mongoose.model('ProductSubCategory', ProductSubCategorySchema)
};
