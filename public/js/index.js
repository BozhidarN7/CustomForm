import '@babel/polyfill';
import axios from 'axios';

import * as usernameValidator from './validators/username';
import * as emailValidator from './validators/email';
import * as passwordValidator from './validators/password';

console.log(usernameValidator);

const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', async (e) => {
    const username = usernameValidator.usernameField.value;
    const email = emailValidator.emailField.value;
    const password = passwordValidator.passwordField.value;

    if (checkForError()) {
        console.log('test');
        return;
    }

    await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000',
        data: {
            username,
            email,
            password,
        },
    });
    location.assign('/');
});

const checkForError = function () {
    if (usernameError.textContent !== '') {
        return true;
    }

    return false;
};
