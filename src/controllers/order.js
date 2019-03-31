// const validator = require('validator');
const moment = require('moment');
const httpStatus = require('http-status');
const { Order, OrderItem } = require('../models/orders');

module.exports = (realTimeService) => {
  const getAllOrders = async (req, res) => {
      try {
          const orders = await Order.find({}).sort({ orderDate: -1 }).populate('tableId').populate('orderItems.productId');
          res.status(httpStatus.OK).json(orders);
      } catch(err) {
          console.log(err);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
  };

  const getOrdersByDate = async (req, res) => {
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

  const getFilteredOrders = async (req, res) => {
      try {
          const filter = Object.assign({}, req.body) || null;
          if (!filter) {
              getAllOrders(req, res);
          }

          if (filter.orderDate) {
            filter.orderDate = {$gt: new Date(filter.orderDate), $lt: new Date(moment(filter.orderDate).add(1, 'days').format('YYYY-MM-DD'))}
          }

          const orders = await Order.find(filter).sort({ orderDate: -1 }).populate('tableId').populate('orderItems.productId');
          res.status(httpStatus.OK).json(orders);
      } catch(err) {
          console.log(err);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
  };

  const getOrder = async (req, res) => {
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

  const createOrder = async (req, res) => {
    try {
      const data = Object.assign({}, req.body) || null;
      if (!data) {
        console.log('No order supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No order supplied.');
      }

      Order.create(data)
        .then(order => {
          // notify in real-time
          // realTimeService.emit('orders::new-order', data.tableId, order);
          realTimeService.broadcast('orders::new-order', order);

          res.status(httpStatus.OK).json(order);
        })
        .catch(err => {
          console.error(err);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    } catch(err) {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  const updateOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      if (!orderId) {
        console.log('No orderId supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No orderId supplied.');
      }

      const data = Object.assign({}, req.body) || null;
      if (!data) {
        console.log('No order update data supplied.');
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No order update data supplied.');
      }
      delete data.createdAt;

      // 'new' flag forces returning of updated order
      const order = await Order.findOneAndUpdate({ _id: orderId }, data, { new: true });

      // notify in real-time
      // realTimeService.emit('orders::updated-order', data.tableId, order);
      realTimeService.broadcast('orders::updated-order', order);

      res.status(httpStatus.OK).json(order);
    } catch(err) {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  const deleteOrder = async (req, res) => {
      try {
          const orderId = req.params.orderId;
          if (!orderId) {
              console.log('No orderId supplied.');
              res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No orderId supplied.');
          }

          await Order.deleteOne({ _id: orderId });
          res.status(httpStatus.OK).send();
      } catch(err) {
          console.log(err);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
  };

  const getOrderItems = async (req, res) => {
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

  const addOrderItem = async (req, res) => {
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
              const savedOrder = await order.save();
              res.status(httpStatus.OK).json(savedOrder);
          }
  	}
  };

  const updateOrderItem = async (req, res) => {
      const orderId = req.params.orderId;
      if (!orderId) {
          console.log('No orderId supplied.');
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No orderId supplied.');
      }

      const itemId = req.params.itemId;
      if (!itemId) {
          console.log('No order item ID supplied.');
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No order item ID supplied.');
      }

      const data = Object.assign({}, req.body) || null;
      if (!data) {
  		console.log('Tried to create empty order item.');
  		res.status(httpStatus.NO_CONTENT).send('Tried to create empty order item.');
      }

      const order = await Order.findOne({ _id: orderId }).populate('orderItems');
      if (!order) {
          console.log('Order not found.');
          res.status(httpStatus.NO_CONTENT).send('Order not found.');
      } else {
          const orderItem = order.orderItems.id(itemId);
          if (!orderItem) {
              console.log('Order item not found.');
              res.status(httpStatus.NO_CONTENT).send('Order not item found.');
          } else {
              orderItem.set(data);
              const savedOrder = await order.save();
              res.status(httpStatus.OK).json(savedOrder);
          }
      }
  };

  const deleteOrderItem = async (req, res) => {
      const orderId = req.params.orderId;
      const itemId = req.params.itemId;

      if (!orderId) {
          console.log('No order ID supplied.');
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No order ID supplied.');
      }

      if (!itemId) {
          console.log('No order item ID supplied.');
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send('No order item ID supplied.');
      }

      const order = await Order.findOne({ _id: orderId }).populate('orderItems');
      if (!order) {
          console.log('Order not found.');
          res.status(httpStatus.NO_CONTENT).send('Order not found.');
      } else {
          order.orderItems.id(itemId).remove();
          const savedOrder = await order.save();
          res.status(httpStatus.OK).json(savedOrder);
      }
  };

  return {
    getAllOrders,
    getOrdersByDate,
    getFilteredOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderItems,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem
  }
};
