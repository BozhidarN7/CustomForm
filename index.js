const express = require('express');

const app = express();

const { PORT } = require('./config/config');
const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');
const registerController = require('./controllers/registerController');

expressConfig(app);
mongooseConfig();

app.get('/', (req, res) => {
    res.render('form', { title: 'Fully automated Form' });
});

app.post('/', (req, res) => {
    registerController
        .register(req.body)
        .then((user) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
