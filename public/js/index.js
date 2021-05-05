import '@babel/polyfill';
import axios from 'axios';

import './validators/email';
import './validators/password';

const usernameField = document.querySelector('#username');
const usernameError = document.querySelector('#usernameError');
const registerButton = document.querySelector('#register');

registerButton.addEventListener('click', async (e) => {
    const username = usernameField.value;
    if (username.length > 20) {
        console.log('Must be less than 20');
        return;
    }

    await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000',
        data: {
            username,
        },
    });
    location.assign('/');
});

const usernameForbiddenSymbols = ['$', '/', '<', '>', '%', '&', '*'];

usernameField.addEventListener('input', (e) => {
    if (usernameField.validity.valid) {
        usernameError.textContent = '';
    } else {
        showError();
    }
    const username = usernameField.value;
    if (username.length > 20) {
        usernameError.textContent =
            'Username must be at most 20 characters long';
    }
    if (checkForForbiddenSymbols(username)) {
        usernameError.textContent = `Username can not include ${usernameForbiddenSymbols.join(
            ' '
        )}`;
    }
});

const showError = function () {
    if (usernameField.validity.valueMissing) {
        usernameError.textContent = 'You must enter a username';
    }
    if (usernameField.validity.tooShort) {
        usernameError.textContent =
            'Username must be at least 3 characters long';
    }
};

const checkForForbiddenSymbols = function (username) {
    usernameForbiddenSymbols.forEach((s) => {
        if (username.includes(s)) {
            return true;
        }
    });
    return false;
};
