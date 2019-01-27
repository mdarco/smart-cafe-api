const mongoose 			= require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const OrderSchema = new mongoose.Schema({
    orderDate: { type: Date, required: true },
    isClosed: { type: Boolean, required: true },
    tableId: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    orderItems: [OrderItem]
}, { collection: 'orders' });

OrderSchema.plugin(mongooseTimestamp);

OrderSchema.index({ orderDate: 1 });

const OrderItemSchema = new mongoose.Schema({
    quantity: { type: Number, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
}, { collection: 'order-items' });

module.exports = { 
    Order: mongoose.model('Order', OrderSchema),
    OrderItem: mongoose.model('OrderItem', OrderItemSchema)
};
