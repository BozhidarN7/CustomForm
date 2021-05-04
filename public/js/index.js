import '@babel/polyfill';
import axios from 'axios';

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

usernameField.addEventListener('input', (e) => {
    usernameField.textContent = 'Must be at least 20 characters';
    if (usernameField.validity.valid) {
        usernameError.textContent = '';
    } else {
        showError();
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
