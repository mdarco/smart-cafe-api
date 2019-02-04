const TableController = require('../controllers/table');

module.exports = api => {
    api.route('/tables').get(TableController.getAllTables);
};
