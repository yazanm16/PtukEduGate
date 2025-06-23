const {body}=require("express-validator");


const input=body('input').notEmpty().withMessage('input is required');

const chatBootValidation=[
    input
]
module.exports={
    chatBootValidation
}