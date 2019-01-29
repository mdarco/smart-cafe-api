const { ProductCategory, ProductSubCategory } = require('../../models/product-categories');
const config    = require('../../config');

module.exports = async () => {
    if (config.database.seed && config.database.seed.productCategories && config.database.seed.productCategories.delete) {
        console.log('Truncating product categories...');

        try {
            await ProductCategory.deleteMany({});
            console.log('Truncating product categories - DONE.');
        } catch (err) {
            console.error('ERROR while truncating product categories:');
            console.error(err);
        }

        if (config.database.seed && config.database.seed.productCategories && config.database.seed.productCategories.add) {
            if (config.database.seedData && config.database.seedData.productCategories && config.database.seedData.productCategories.length > 0) {
                console.log('Adding product categories to DB...');
                const promises = config.database.seedData.productCategories.map(async (category) => {
                    const result = await ProductCategory.create(category);
                    return result;
                });
                
                try {
                    // this will do in parallel (for sequential execution the regular for loop should be used)
                    await Promise.all(promises);
                    console.log('Adding product categories to DB - DONE.');
                } catch (err) {
                    console.error('ERROR while adding product categories - some categories were not added:');
                    console.error(err);
                }
            }
        }
    }
};
