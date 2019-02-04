// const validator = require('validator');
const httpStatus = require('http-status');
const { ProductCategory, ProductSubCategory } = require('../models/product-categories');

exports.getAllProductCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.find({}).sort({ name: 1 });
        res.status(httpStatus.OK).json(categories);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getProductSubCategories = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            console.log('No categoryId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No categoryId supplied.');
        }

        const subCategories = await ProductSubCategory.find({ categoryId }).sort({ name: 1 }).populate('categoryId');
        res.status(httpStatus.OK).json(subCategories);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getProductCategory = async (req, res) => {
    try {
        const productCategoryId = req.params.productCategoryId;
        if (!productCategoryId) {
            console.log('No productCategoryId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No productCategoryId supplied.');
        }

        const categories = await ProductCategory.findOne({ _id: productCategoryId });
        res.status(httpStatus.OK).json(categories);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};
