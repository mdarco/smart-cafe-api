const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');
const { ProductSubCategory } = require('../models/product-categories');

const ProductSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, trim: true },
    categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true }],
    subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductSubCategory', required: true }],
    priceWithVAT: { type: Number, required: true },
    isRecommended: { type: Boolean, required: true },
    isPromo: { type: Boolean, required: true },
    allergens: [String]
}, { collection: 'products' });

ProductSchema.pre('save', async function(next) {
    // assign categoryId based on selected subCategoryId
    if (!this.subCategoryId || this.subCategoryId.length === 0) {
        return next();
    } else {
        let id_category = [];
        for (let i = 0; i <= this.subCategoryId.length - 1; i++) {
            const subCategory = await ProductSubCategory.findOne({ _id: this.subCategoryId[i] });
            if (subCategory) {
                id_category.push(subCategory.categoryId);
            }
        }
        this.categoryId = [ ...new Set(id_category) ]; // this will remove duplicates

        return next();
    }
});

ProductSchema.plugin(mongooseTimestamp);

ProductSchema.index({ name: 1 });

module.exports = mongoose.model('Product', ProductSchema);
