const ProductController = require('../controllers/product');

module.exports = api => {
    api.route('/products').get(ProductController.getAllProducts);
    api.route('/products/by-category/:categoryId').get(ProductController.getProductsByCategory);
    api.route('/products/by-sub-category/:subCategoryId').get(ProductController.getProductsBySubCategory);
    // api.route('/products').post(ProductController.addProduct);
    api.route('/products/:productId').get(ProductController.getProduct);
    // api.route('/products/:productId').put(ProductController.editProduct);
    // api.route('/products/:productId').delete(ProductController.deleteProduct);
};
