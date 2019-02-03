// const validator = require('validator');
const httpStatus = require('http-status');
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(httpStatus.OK).json(products);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};
