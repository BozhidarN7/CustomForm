const mongoose = require('mongoose');

module.exports = () => {
    const dbURL = 'mongodb://localhost:27017/registrationForm';
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error.'));
    db.on('open', () => console.log('DB connection successful'));
};
