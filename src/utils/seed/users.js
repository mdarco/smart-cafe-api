const User      = require('../../models/user');
const config    = require('../../config');

module.exports = async () => {
    if (config.database.seed && config.database.seed.users && config.database.seed.users.delete) {
        console.log('Truncating users...');

        try {
            await User.deleteMany({});
            console.log('Truncating users - DONE.');
        } catch (err) {
            console.error('ERROR while truncating users:');
            console.error(err);
        }

        if (config.database.seed && config.database.seed.users && config.database.seed.users.add) {
            if (config.database.seedData && config.database.seedData.users && config.database.seedData.users.length > 0) {
                console.log('Adding users to DB...');
                const promises = config.database.seedData.users.map(async (user) => {
                    const result = await User.create(user);
                    return result;
                });

                try {
                    // this will do in parallel (for sequential execution the regular for loop should be used)
                    await Promise.all(promises);
                    console.log('Adding users to DB - DONE.');
                } catch (err) {
                    console.error('ERROR while adding users - some users were not added:');
                    console.error(err);
                }
            }
        }
    }
};
