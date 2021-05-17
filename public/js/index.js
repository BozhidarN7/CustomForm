import '@babel/polyfill';
import axios from 'axios';

import * as usernameValidator from './validators/username';
import * as emailValidator from './validators/email';
import * as passwordValidator from './validators/password';
import { showAlert } from './alerts';

const registerButton = document.querySelector('#register');

let msg = '';

registerButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const username = usernameValidator.usernameField.value;
    const email = emailValidator.emailField.value;
    const password = passwordValidator.passwordField.value;
    const repeatPassword = passwordValidator.repeatPasswordField.value;

    if (checkForError()) {
        showAlert('error', msg, 2);
        return;
    }
    try {
        const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3000',
            data: {
                username,
                email,
                password,
                repeatPassword,
            },
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Registration successful!');
        }
        window.setTimeout(() => {
            location.assign('/');
        }, 1500);
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
});

const checkForError = function () {
    if (checkForEmptyField()) {
        return true;
    }

    if (usernameValidator.usernameError.textContent !== '') {
        msg = `${usernameValidator.usernameError.textContent}`;
        usernameValidator.usernameField.focus();
        return true;
    }
    if (emailValidator.emailError.textContent !== '') {
        msg = `${emailValidator.emailError.textContent}`;
        emailValidator.emailField.focus();
        return true;
    }
    if (passwordValidator.passwordError.textContent !== '') {
        msg = `${passwordValidator.passwordError.textContent}`;
        passwordValidator.passwordField.focus();
        return true;
    }
    if (passwordValidator.repeatPasswordError.textContent !== '') {
        msg = `${passwordValidator.repeatPasswordError.textContent}`;
        passwordValidator.repeatPasswordField.focus();
        return true;
    }
    return false;
};

const checkForEmptyField = function () {
    if (usernameValidator.usernameField.value === '') {
        msg = 'Username is required';
        usernameValidator.usernameField.focus();
        return true;
    }
    if (emailValidator.emailField.value === '') {
        msg = 'Email is required';
        emailValidator.emailField.focus();
        return true;
    }
    if (passwordValidator.passwordField.value === '') {
        msg = 'Passowrd is required';
        passwordValidator.passwordField.focus();
        return true;
    }
    if (passwordValidator.repeatPasswordField.value === '') {
        msg = 'Repeat password is required';
        passwordValidator.repeatPasswordField.focus();
        return true;
    }
    return false;
};
