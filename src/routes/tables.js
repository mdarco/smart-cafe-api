const TableController = require('../controllers/table');

module.exports = api => {
    api.route('/tables').get(TableController.getAllTables);
    api.route('/tables/:tableId').get(TableController.getTable);
    api.route('/tables/:tableId').put(TableController.updateTable);
};
