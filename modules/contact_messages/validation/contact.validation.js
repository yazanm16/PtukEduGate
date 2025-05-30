const{body,param, query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const name=body('name').notEmpty().withMessage('The name is required');
const email=body('email').isEmail().withMessage('The email is required');
const message=body('message').notEmpty().withMessage('The message is required');
const phone=body('phone').optional().isMobilePhone('ar-PS', {strictMode:true}).withMessage('Invalid phone number');

const sendContactMessageValidation=[
    name,
    email,
    message,
    phone
]
module.exports={
    sendContactMessageValidation
}