// const validator = require('validator');
const httpStatus = require('http-status');
const Table = require('../models/table');

exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find({}).sort({ tag: 1 });
        res.status(httpStatus.OK).json(tables);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getTable = async (req, res) => {
    const tableId = req.params.tableId;
    if (!tableId) {
        console.log('No tableId supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No tableId supplied.');
    }

    try {
        const table = await Table.findOne({ _id: tableId });
        res.status(httpStatus.OK).json(table);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.updateTable = async (req, res) => {
    const tableId = req.params.tableId;
    if (!tableId) {
        console.log('No tableId supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No tableId supplied.');
    }

    const data = Object.assign({}, req.body) || null;
    if (!data) {
        console.log('No table info supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No table info supplied.');
    }

    try {
        await Table.updateOne({ _id: tableId }, data);
        res.status(httpStatus.OK);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};
