const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { SALT_VALUE } = require('../config/config');

exports.register = async (data) => {
    const salt = await bcrypt.genSalt(SALT_VALUE);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
    return await User.create(data);
};
