const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { SALT_VALUE } = require('../config/config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { validate } = require('../models/userModel');

exports.register = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(SALT_VALUE);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;

    validateData(req.body);

    const user = await User.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

const validateData = (data) => {
    if (isEmailUnique(data.email)) {
        throw new AppError('Username with that email already exists', 500);
    }
};

const isEmailUnique = async (email) => {
    const existingEmails = await User.find({}, { email: 1, _id: 0 });
    if (existingEmailsg.includes(email)) {
        return true;
    }

    return false;
};
