const ProductCategoryController = require('../controllers/product-category');

module.exports = api => {
    api.route('/product-categories').get(ProductCategoryController.getAllProductCategories);
    api.route('/product-sub-categories/:categoryId').get(ProductCategoryController.getProductSubCategories);
    // api.route('/product-categories').post(ProductCategoryController.addProductCategory);
    // api.route('/product-sub-categories').post(ProductCategoryController.addProductSubCategory);
    api.route('/product-categories/:productCategoryId').get(ProductCategoryController.getProductCategory);
    // api.route('/product-categories/:productCategoryId').put(ProductCategoryController.editProductCategory);
    // api.route('/product-sub-categories/:productSubCategoryId').put(ProductCategoryController.editProductSubCategory);
    // api.route('/product-categories/:productCategoryId').delete(ProductCategoryController.deleteProductCategory);
    // api.route('/product-sub-categories/:productSubCategoryId').delete(ProductCategoryController.deleteProductSubCategory);
};
