const OrderController = require('../controllers/order');

module.exports = api => {
    api.route('/orders').get(OrderController.getAllOrders);
    api.route('/orders/by-date/:orderDate').get(OrderController.getOrdersByDate);
    api.route('/orders').post(OrderController.createOrder);
    api.route('/orders/:orderId').get(OrderController.getOrder);
    api.route('/orders/:orderId').put(OrderController.updateOrder);
    api.route('/orders/:orderId').delete(OrderController.deleteOrder);
    api.route('/orders/:orderId/items').get(OrderController.getOrderItems);
    api.route('/orders/:orderId/items').post(OrderController.addOrderItem);
    api.route('/orders/:orderId/items/:itemId').put(OrderController.updateOrderItem);
    api.route('/orders/:orderId/items/:itemId').delete(OrderController.deleteOrderItem);
};
