import axios from 'axios';

const usernameField = document.querySelector('#username');
const usernameError = document.querySelector('#usernameError');

const usernameForbiddenSymbols = ['$', '/', '<', '>', '%', '&', '*'];
let usernames = [];

(function () {
    axios.get('http://127.0.0.1:3000/users/getAll').then((data) => {
        usernames = data.data.users.map((user) => user.username);
    });
})();

usernameField.addEventListener('input', (e) => {
    if (usernameField.validity.valid) {
        usernameError.textContent = '';
    } else {
        showError();
    }
    const username = usernameField.value.trim();
    if (username.length > 20) {
        usernameError.textContent =
            'Username must be at most 20 characters long';
    }
    if (checkForForbiddenSymbols(username)) {
        usernameError.textContent = `Username can not include ${usernameForbiddenSymbols.join(
            ' '
        )}`;
    }
    if (usernames.includes(username)) {
        usernameError.textContent = 'Username already exists';
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

export { usernameField, usernameError };
