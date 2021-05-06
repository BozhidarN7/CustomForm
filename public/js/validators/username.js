const usernameField = document.querySelector('#username');
const usernameError = document.querySelector('#usernameError');
const registerButton = document.querySelector('#register');

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
