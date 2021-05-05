const emailField = document.querySelector('#email');
const emailError = document.querySelector('#emailError');

emailField.addEventListener('input', (e) => {
    const email = emailField.value;
    if (!isValidEmail(email)) {
        emailError.textContent =
            'You must enter a valid email! Example: test@smth.com';
    }
    if (emailField.validity.valid) {
        emailError.textContent = '';
    } else {
        showError();
    }
});

const showError = function () {
    if (emailField.validity.valueMissing) {
        emailError.textContent = 'You must enter an email';
    }
};

const isValidEmail = function (email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
};
