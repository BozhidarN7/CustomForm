const User = require('../models/userModel');

exports.register = async (data) => {
    return await User.create(data);
};
