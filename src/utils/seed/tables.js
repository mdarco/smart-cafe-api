const Table     = require('../../models/table');
const config    = require('../../config');

module.exports = async () => {
    if (config.database.seed && config.database.seed.tables && config.database.seed.tables.delete) {
        console.log('Truncating tables...');

        try {
            await Table.deleteMany({});
            console.log('Truncating tables - DONE.');
        } catch (err) {
            console.error('ERROR while truncating tables:');
            console.error(err);
        }

        if (config.database.seed && config.database.seed.tables && config.database.seed.tables.add) {
            if (config.database.seedData && config.database.seedData.tables && config.database.seedData.tables.length > 0) {
                console.log('Adding tables to DB...');
                const promises = config.database.seedData.tables.map(async (table) => {
                    const result = await Table.create(table);
                    return result;
                });
                
                try {
                    // this will do in parallel (for sequential execution the regular for loop should be used)
                    await Promise.all(promises);
                    console.log('Adding tables to DB - DONE.');
                } catch (err) {
                    console.error('ERROR while adding tables - some tables not added:');
                    console.error(err);
                }
            }
        }
    }
};
