const passwordField = document.querySelector('#password');
const repeatPasswordField = document.querySelector('#repeatPassword');
const passwordError = document.querySelector('#passwordError');
const repeatPasswordError = document.querySelector('#repeatPasswordError');
const strengthMeter = document.querySelector('#strengthMeter');
const reasonsContainer = document.querySelector('#reasons');
const togglePassword = document.querySelector('#togglePassword');
const toggleRepeatPassword = document.querySelector('#toggleRepeatPassword');

togglePassword.addEventListener('click', () => {
    togglePasswordVisibility(passwordField, togglePassword);
});

toggleRepeatPassword.addEventListener('click', () => {
    togglePasswordVisibility(repeatPasswordField, toggleRepeatPassword);
});

passwordField.addEventListener('input', (e) => {
    showStrengthMeter();
    if (passwordField.validity.valid) {
        passwordError.textContent = '';
    } else {
        showError(passwordError, 'You must enter a password');
    }

    updateStrengthMeter();

    if (passwordsMatch()) {
        repeatPasswordError.textContent = '';
    } else {
        repeatPasswordError.textContent = 'Passwords are not same';
    }
});

const togglePasswordVisibility = function (field, button) {
    const type =
        field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);
    button.classList.toggle('fa-eye-slash');
};

repeatPasswordField.addEventListener('input', (e) => {
    if (repeatPasswordField.validity.valid) {
        repeatPasswordError.textContent = '';
    } else {
        showError(repeatPasswordError, 'You must repeat your password');
    }

    if (passwordsMatch()) {
        repeatPasswordError.textContent = '';
    } else {
        repeatPasswordError.textContent = 'Passwords are not same';
    }
});

const passwordsMatch = function () {
    const password = passwordField.value;
    const repeatPassword = repeatPasswordField.value;
    if (password !== repeatPassword) {
        return false;
    }
    return true;
};

const updateStrengthMeter = function () {
    const weaknesses = calculatePasswordStrength(passwordField.value);
    let strength = 100;
    reasonsContainer.innerHTML = '';
    weaknesses.forEach((weakness) => {
        if (weakness == null) return;
        strength -= weakness.deduction;
        const messageElement = document.createElement('div');
        messageElement.innerText = weakness.message;
        reasonsContainer.appendChild(messageElement);
    });
    strengthMeter.style.setProperty('--strength', strength);
};

const calculatePasswordStrength = function (password) {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowercaseWeakness(password));
    weaknesses.push(uppercaseWeakness(password));
    weaknesses.push(numberWeakness(password));
    weaknesses.push(specialCharacterWeakness(password));
    weaknesses.push(repeatCharacterWeakness(password));

    return weaknesses;
};

const lengthWeakness = function (password) {
    const length = password.length;
    if (length <= 5) {
        return {
            message: 'Your password is to short',
            deduction: 40,
        };
    }

    if (length <= 10) {
        return {
            message: 'Your password could be longer',
            deduction: 15,
        };
    }
};

const uppercaseWeakness = function (password) {
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters');
};

const lowercaseWeakness = function (password) {
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters');
};

const numberWeakness = function (password) {
    return characterTypeWeakness(password, /[0-9]/g, 'numbers');
};

const specialCharacterWeakness = function (password) {
    return characterTypeWeakness(
        password,
        /[^0-9a-zA-Z\s]/g,
        'special characters'
    );
};

const characterTypeWeakness = function (password, regex, type) {
    const matches = password.match(regex) || [];
    if (matches.length === 0) {
        return {
            message: `Your password has no ${type}`,
            deduction: 20,
        };
    }

    if (matches.length <= 2) {
        return {
            message: `Your password could use more ${type}`,
            deduction: 5,
        };
    }
};

const repeatCharacterWeakness = function (password) {
    const matches = password.match(/(.)\1/g) || [];

    if (matches.length > 0) {
        return {
            message: 'Your password has repeat characters',
            deduction: matches.length * 10,
        };
    }
};

const showError = function (field, message) {
    if (passwordField.validity.valueMissing) {
        field.textContent = message;
    }
};
const showStrengthMeter = function () {
    strengthMeter.classList.remove('hidden');
    strengthMeter.classList.add('strength-meter');
};

export {
    passwordField,
    passwordError,
    repeatPasswordField,
    repeatPasswordError,
};
