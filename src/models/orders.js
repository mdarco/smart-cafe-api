const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');

const OrderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    isDelivered: { type: Boolean, required: true },
    note: { type: String }
});

const OrderSchema = new mongoose.Schema({
    orderDate: { type: Date, required: true },
    isClosed: { type: Boolean, required: true },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    orderItems: [OrderItemSchema]
}, { collection: 'orders' });

OrderSchema.plugin(mongooseTimestamp);

OrderSchema.index({ orderDate: 1 });

module.exports = { 
    Order: mongoose.model('Order', OrderSchema),
    OrderItem: mongoose.model('OrderItem', OrderItemSchema)
};
