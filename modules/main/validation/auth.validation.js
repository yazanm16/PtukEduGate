const { body } = require('express-validator');

const emailOrUsername = body('emailOrUsername', 'Email or Username is required')
    .notEmpty();

const password = body('password', 'Password is required')
    .notEmpty()
    .custom((value) => {
        if (value && value.length < 6) {
            return Promise.reject('The password should be greater than 6 characters');
        }
        return Promise.resolve();
    });

const loginValidation = [
    emailOrUsername,
    password
];

module.exports = {
    loginValidation
};
