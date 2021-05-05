const passwordField = document.querySelector('#password');
const repeatPasswordField = document.querySelector('#repeatPassword');
const passwordError = document.querySelector('#passwordError');
const repeatPasswordError = document.querySelector('#repeatPasswordError');
const strengthMeter = document.querySelector('#strengthMeter');
const reasonsContainer = document.querySelector('#reasons');

passwordField.addEventListener('input', (e) => {
    if (passwordField.validity.valid) {
        passwordError.textContent = '';
    } else {
        showError();
    }
    updateStrengthMeter();
});

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

const showError = function () {
    if (passwordField.validity.valueMissing) {
        passwordError.textContent = 'You must enter a password';
    }
};
