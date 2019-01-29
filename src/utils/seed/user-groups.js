const UserGroup = require('../../models/user-group');
const config    = require('../../config');

module.exports = async () => {
    if (config.database.seed && config.database.seed.userGroups && config.database.seed.userGroups.delete) {
        console.log('Truncating user groups...');

        try {
            await UserGroup.deleteMany({});
            console.log('Truncating user groups - DONE.');
        } catch (err) {
            console.error('ERROR while truncating user groups:');
            console.error(err);
        }

        if (config.database.seed && config.database.seed.userGroups && config.database.seed.userGroups.add) {
            if (config.database.seedData && config.database.seedData.userGroups && config.database.seedData.userGroups.length > 0) {
                console.log('Adding user groups to DB...');
                const promises = config.database.seedData.userGroups.map(async (group) => {
                    const result = await UserGroup.create(group);
                    return result;
                });
                
                try {
                    // this will do in parallel (for sequential execution the regular for loop should be used)
                    await Promise.all(promises);
                    console.log('Adding user groups to DB - DONE.');
                } catch (err) {
                    console.error('ERROR while adding user groups - some groups were not added:');
                    console.error(err);
                }
            }
        }
    }
};
