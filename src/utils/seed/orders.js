const { factory } = require('factory-girl');
const moment = require('moment');
const chance = require('chance').Chance();

const { Order, OrderItem } = require('../../models/orders');
const Table = require('../../models/table');
const Product = require('../../models/product');
const config = require('../../config');

module.exports = async () => {
    const ORDER_BUILD_COUNT = 10;
    const ORDER_ITEMS_COUNT_PER_ORDER = [1, 2, 3, 4, 5]; // also used for subtracting days for order date

    const getRandomTable = async () => {
        const tables = (await Table.find({})).map(table => table._id);
        if (tables && tables.length > 0) {
            return tables[Math.floor(Math.random() * tables.length)];
        }
    };

    const getRandomProduct = async () => {
        const products = (await Product.find({})).map(product => product._id);
        if (products && products.length > 0) {
            return products[Math.floor(Math.random() * products.length)];
        }
    };

    const getOrderItemsCountPerOrder = () => {
        return ORDER_ITEMS_COUNT_PER_ORDER[Math.floor(Math.random() * ORDER_ITEMS_COUNT_PER_ORDER.length)];
    };

    const getSubtractDaysCount = () => {
        return ORDER_ITEMS_COUNT_PER_ORDER[Math.floor(Math.random() * ORDER_ITEMS_COUNT_PER_ORDER.length)];
    };

    const createOrderItems = async () => {
        let orderItems = [];
        for (let i = 0; i <= getOrderItemsCountPerOrder() - 1; i++) {
            let orderItem = {
                quantity: chance.integer({ min: 5, max: 1000 })
            };
            const productId = await getRandomProduct();
            orderItem.productId = productId;

            orderItems.push(orderItem);
        }

        // console.log('>>> ORDER ITEMS:', orderItems);
        return orderItems;
    };
    
    if (config.database.seed && config.database.seed.orders && config.database.seed.orders.delete) {
        console.log('Truncating orders...');
    
        try {
            await Order.deleteMany({});
            console.log('Truncating orders - DONE.');
        } catch (err) {
            console.error('ERROR while truncating orders:');
            console.error(err);
        }
    }
    
    if (config.database.seed && config.database.seed.orders && config.database.seed.orders.add) {
        console.log('Adding orders to DB...');
    
        factory.define('Order', Order, {
            orderDate: () => moment().subtract(getSubtractDaysCount(), 'days').toDate(),
            isClosed: factory.chance('bool'),
            tableId: getRandomTable,
            orderItems: createOrderItems
        });

        factory.buildMany('Order', ORDER_BUILD_COUNT).then(async (orders) => {
            // console.log('>>> ORDERS:', orders);
            const promises = orders.map(async (order) => {
                delete order._id;
                const result = await Order.create(order);
                return result;
            });
            
            try {
                // this will do in parallel (for sequential execution the regular for loop should be used)
                await Promise.all(promises);
                console.log('Adding orders to DB - DONE.');
            } catch (err) {
                console.error('ERROR while adding orders and/or order items - some orders and/or order items were not added:');
                console.error(err);
            }
        });
    }
}
