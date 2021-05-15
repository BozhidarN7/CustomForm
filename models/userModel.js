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
        validate: {
            validator: function (email) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    email
                );
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    password: {
        type: String,
        required: [true, 'You must enter a password'],
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
