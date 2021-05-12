const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { SALT_VALUE } = require('../config/config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(SALT_VALUE);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = await User.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});
