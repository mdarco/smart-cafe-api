// const validator = require('validator');
const moment = require('moment');
const httpStatus = require('http-status');
const { Order, OrderItem } = require('../models/orders');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ orderDate: -1 }).populate('tableId').populate('orderItems.productId');
        res.status(httpStatus.OK).json(orders);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getOrdersByDate = async (req, res) => {
    try {
        const orderDate = req.params.orderDate;
        if (!orderDate) {
            console.log('No order date supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No order date supplied.');
        }

        const orders = await Order.find({
            orderDate: {$gt: new Date(orderDate), $lt: new Date(moment(orderDate).add(1, 'days').format('YYYY-MM-DD'))}
        }).sort({ orderDate: -1 }).populate('tableId').populate('orderItems.productId');
        res.status(httpStatus.OK).json(orders);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) {
            console.log('No orderId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No orderId supplied.');
        }

        const order = await Order.findOne({ _id: orderId }).populate('tableId').populate('orderItems.productId');
        res.status(httpStatus.OK).json(order);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.getOrderItems = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) {
            console.log('No orderId supplied.');
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No orderId supplied.');
        }

        const order = await Order.findOne({ _id: orderId }).populate('orderItems.productId');
        res.status(httpStatus.OK).json(order.orderItems);
    } catch(err) {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

exports.addOrderItem = async (req, res) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        console.log('No orderId supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No orderId supplied.');
    }

    const data = Object.assign({}, req.body) || null;
    if (!data) {
		console.log('Tried to create empty order item.');
		res.status(httpStatus.NO_CONTENT).send('Tried to create empty order item.');
	} else {
        const order = await Order.findOne({ _id: orderId }).populate('orderItems');
        if (!order) {
            console.log('Order not found.');
		    res.status(httpStatus.NO_CONTENT).send('Order not found.');
        } else {
            order.orderItems.push(data);
            await order.save();
        }
	}
};
