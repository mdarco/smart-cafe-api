// const validator = require('validator');
const httpStatus = require('http-status');
const Table = require('../models/table');

exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find({});
        res.status(httpStatus.OK).json(tables);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};
