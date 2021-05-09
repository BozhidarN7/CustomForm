import '@babel/polyfill';
import axios from 'axios';

import * as usernameValidator from './validators/username';
import * as emailValidator from './validators/email';
import * as passwordValidator from './validators/password';

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
    if (checkForEmptyField()) {
        return true;
    }

    if (usernameValidator.usernameError.textContent !== '') {
        usernameValidator.usernameField.focus();
        return true;
    }
    if (emailValidator.emailError.textContent !== '') {
        emailValidator.emailField.focus();
        return true;
    }
    if (passwordValidator.passwordError.textContent !== '') {
        passwordValidator.passwordField.focus();
        return true;
    }
    if (passwordValidator.repeatPasswordError.textContent !== '') {
        passwordValidator.repeatPasswordField.focus();
        return true;
    }
    return false;
};

const checkForEmptyField = function () {
    if (usernameValidator.usernameField.value === '') {
        return true;
    }
    if (emailValidator.emailField.value === '') {
        return true;
    }
    if (passwordValidator.passwordField.value === '') {
        return true;
    }
    if (passwordValidator.repeatPasswordField.value === '') {
        return true;
    }
    return false;
};
