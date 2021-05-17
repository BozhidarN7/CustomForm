const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { SALT_VALUE } = require('../config/config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    trimData(req.body);

    const hasError = await validateData(req.body, next);
    if (hasError) return;

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

const validateData = async (data, next) => {
    const isUnieque = await isEmailUnique(data.email);
    if (isUnieque) {
        next(new AppError('Username with that email already exists', 500));
        return true;
    } else if (!isPasswordSpecified(data)) {
        throw new AppError('You must enter a password', 500);
    } else if (!isReapeatPasswordSpecified(data)) {
        throw new AppError('You must repeat your password');
    } else if (!arePasswordsSame(data)) {
        throw new AppError('Passwords are different', 500);
    }

    return false;
};

const isEmailUnique = async (email) => {
    const existingEmails = (await User.find({}, { email: 1, _id: 0 })).map(
        (x) => x.email
    );

    if (existingEmails.includes(email)) {
        return true;
    }

    return false;
};

const arePasswordsSame = (data) => {
    if (data.password === data.repeatPassword) {
        return true;
    }
    return false;
};

const isPasswordSpecified = (data) => {
    if (data.password === '') {
        return false;
    }
    return true;
};

const isReapeatPasswordSpecified = (data) => {
    if (data.repeatPassword === '') {
        return false;
    }
    return true;
};

const trimData = (data) => {
    data.username = data.username.trim();
    data.email = data.email.trim();
    data.password = data.password.trim();
};
