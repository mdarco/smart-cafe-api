// const validator = require('validator');
const httpStatus = require('http-status');
const Product = require('../models/product');
const { ProductCategory } = require('../models/product-categories');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ name: 1 }).populate('categoryId').populate('subCategoryId');
        res.status(httpStatus.OK).json(products);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getProductList = async (req, res) => {
    try {
        let productList = {};
        const categories = await ProductCategory.find({}, '_id name').sort({ name: 1 });
        for (let i = 0; i <= categories.length - 1; i++) {
            const products = await Product.find({ categoryId: categories[i] }, '_id name decription subCategoryId allergens priceWithVAT isRecommended isPromo').populate('subCategoryId').sort({ 'subCategoryId.name': 1 });
            productList[categories[i]] = products;
        }
        
        res.status(httpStatus.OK).json(productList);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            console.log('No categoryId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No categoryId supplied.');
        }

        const products = await Product.find({ categoryId }).sort({ name: 1 }).populate('categoryId').populate('subCategoryId');
        res.status(httpStatus.OK).json(products);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getProductsBySubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.subCategoryId;
        if (!subCategoryId) {
            console.log('No subCategoryId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No subCategoryId supplied.');
        }

        const products = await Product.find({ subCategoryId }).sort({ name: 1 }).populate('categoryId').populate('subCategoryId');
        res.status(httpStatus.OK).json(products);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            console.log('No productId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No productId supplied.');
        }

        const products = await Product.findOne({ _id: productId }).populate('categoryId').populate('subCategoryId');
        res.status(httpStatus.OK).json(products);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};
