// const validator	= require('validator');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.login = async (req, res) => {
    const credentials = Object.assign({}, req.body) || null;
	if (!credentials) {
		console.log('Tried to login with nonexisting credentials.');
		res.status(httpStatus.NO_CONTENT).send('Tried to login with nonexisting credentials.');
	} else {
        try {
            const user = await User.findOne({
                username: credentials.username
            }).populate('userGroups').exec();

            if (!user) {
                res.status(httpStatus.UNAUTHORIZED).send('Credentials do not match.');
            } else {
                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) {
                    res.status(httpStatus.UNAUTHORIZED).send('Credentials do not match.');
                } else {
                    let payload = {
                        id: user._id,
                        username: user.username,
                        fullname: user.fullName,
                        userGroups: user.userGroups
                    };
                
                    // set jwt exp date and sign token
                    const token =jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
                    console.log('TOKEN', token);
                    res.status(httpStatus.OK).send('Bearer ' + token);
                }
            }
        } catch(err) {
            console.error(err);
			res.status(httpStatus.UNAUTHORIZED).send(err);
        }
	}
};
