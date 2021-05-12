const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must enter a username'],
        unique: [true, 'Username already exists'],
        minlength: [3, 'Username must be at leat 3 characters long'],
        maxlength: [20, 'Username must be at most 20 characters long'],
    },
    email: {
        type: String,
        required: [true, 'You must enter an email'],
    },
    password: {
        type: String,
        required: [true, 'You must enter a password'],
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
