const { factory } = require('factory-girl');
const Product = require('../../models/product');
const { ProductSubCategory } = require('../../models/product-categories');
const config = require('../../config');

module.exports = async () => {
    const PRODUCT_BUILD_COUNT = 10;

    const allergens = [
        'Kiki-riki', 'badem', 'lešnik'
    ];

    const getRandomSubCategory = async () => {
        const subCategories = (await ProductSubCategory.find({})).map(subCategory => subCategory._id);
        if (subCategories && subCategories.length > 0) {
            return subCategories[Math.floor(Math.random() * subCategories.length)];
        }
    };
    
    if (config.database.seed && config.database.seed.products && config.database.seed.products.delete) {
        console.log('Truncating products...');
    
        try {
            await Product.deleteMany({});
            console.log('Truncating products - DONE.');
        } catch (err) {
            console.error('ERROR while truncating products:');
            console.error(err);
        }
    }
    
    if (config.database.seed && config.database.seed.products && config.database.seed.products.add) {
        console.log('Adding products to DB...');
    
        factory.define('Product', Product, {
            name: factory.sequence('Product.name', n => `Artikal ${n}`),
            description: factory.chance('sentence'),
            subCategoryId: getRandomSubCategory,
            priceWithVAT: factory.chance('floating', { min: 10, max: 10000, fixed: 2 }),
            isRecommended: factory.chance('bool'),
            isPromo: factory.chance('bool'),
            allergens: allergens[Math.floor(Math.random() * allergens.length)]
        });
    
        factory.buildMany('Product', PRODUCT_BUILD_COUNT).then(async (products) => {
            // console.log(products);
            const promises = products.map(async (product) => {
                delete product._id;
                const result = await Product.create(product);
                return result;
            });
            
            try {
                // this will do in parallel (for sequential execution the regular for loop should be used)
                await Promise.all(promises);
                console.log('Adding products to DB - DONE.');
            } catch (err) {
                console.error('ERROR while adding products - some products were not added:');
                console.error(err);
            }
        });
    }
}
