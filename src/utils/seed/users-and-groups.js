const UserGroup = require('../../models/user-group');
const User      = require('../../models/user');
const config    = require('../../config');

module.exports = async () => {
    if (config.database.seed && config.database.seed.usersAndGroups && config.database.seed.usersAndGroups.delete) {
        console.log('Truncating users and groups...');

        try {
            await User.deleteMany({});
            await UserGroup.deleteMany({});
            console.log('Truncating users and groups - DONE.');
        } catch (err) {
            console.error('ERROR while truncating users and groups:');
            console.error(err);
        }

        if (config.database.seed && config.database.seed.usersAndGroups && config.database.seed.usersAndGroups.add) {
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

            if (config.database.seedData && config.database.seedData.users && config.database.seedData.users.length > 0) {
                console.log('Adding users to DB...');
                const promises = config.database.seedData.users.map(async (user) => {
                    let userGroups = [];
                    for (let i = 0; i <= user.userGroups.length - 1; i++) {
                        const groupName = user.userGroups[i];
                        const userGroup = await UserGroup.findOne({ name: groupName });
                        if (userGroup) {
                            userGroups.push(userGroup._id);
                        }
                    }
                    user.userGroups = userGroups;

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
