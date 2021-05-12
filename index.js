const express = require('express');

const app = express();

const { PORT } = require('./config/config');
const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');
const registerController = require('./controllers/registerController');
const errorController = require('./controllers/errorController');
const User = require('./models/userModel');

expressConfig(app);
mongooseConfig();

app.get('/', (req, res) => {
    res.render('form', { title: 'Fully automated Form' });
});

app.post('/', registerController.register);

app.get('/users/getAll', async (req, res) => {
    const users = await User.find({}, { username: 1, _id: 0 });
    res.status(200).json({
        status: 'success',
        users,
    });
});

app.use(errorController);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
