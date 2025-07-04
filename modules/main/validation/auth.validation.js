const { body } = require('express-validator');

const emailOrUsername = body('emailOrUsername', 'Email or Username is required')
    .notEmpty();

const password = body('password', 'Password is required')
    .notEmpty()
    .bail()
    .custom((value) => {
        if (value && value.length < 6) {
            return Promise.reject('The password should be greater than 6 characters');
        }
        return Promise.resolve();
    });

const email=body('email').notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Invalid email format')

const token = body('token').notEmpty().withMessage('Token is required')

const new_password=body('new_password').notEmpty().withMessage('New Password is required')
    .bail()
    .isLength({min:6}).withMessage('Password must be at least 6 characters')
const confirmPassword=body('confirmPassword').notEmpty().withMessage('Confirm passwords are required')
    .bail()
    .isLength({min:6}).withMessage('Password must be at least 6 characters')

const rememberMe = body('rememberMe')
    .optional()
    .isBoolean().withMessage('rememberMe must be a boolean');

const loginValidation = [
    emailOrUsername,
    password,
    rememberMe
];

const forgotPasswordValidation=[
    email
]

const resetPasswordValidation=[
    token,new_password,confirmPassword
]
module.exports = {
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};
