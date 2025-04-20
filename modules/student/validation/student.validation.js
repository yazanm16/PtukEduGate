const{body,param}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const router = require("../../../routes");
const db = knex(knexConfig);

const student_id=param('student_id').isInt().withMessage('Student ID is must be valid')
    .custom(async(val)=>{
    try {
        const s_id=await db('students').where('student_id',val).first();
        if(s_id){
            return Promise.resolve();
        }
        else{
            return Promise.reject('No such student');
        }
    }catch(e){
            return Promise.reject('No such student');
    }
    })

const student_name=body('student_name').notEmpty().withMessage('Student name is required');

const student_username = body('student_username')
    .notEmpty().withMessage('Student username is required')
    .custom(async (val, { req }) => {
        const user = await db('students')
            .where('student_username', val)
            .andWhereNot('student_id', req.user.id)
            .first();

        if (user) {
            return Promise.reject('This username already exists');
        }

        return true;
    });


const student_email = body('student_email')
    .notEmpty().withMessage('Student email is required')
    .isEmail().withMessage('Email is not valid')
    .custom(async (val, { req }) => {
        const email = val.toLowerCase();
        const user = await db('students')
            .where('student_email', email)
            .andWhereNot('student_id', req.user.id)
            .first();

        if (user) {
            return Promise.reject('This email already exists');
        }

        return true;
    });


const student_password=body('student_password','Student passwords are required').notEmpty()
    .custom(async(val)=>{
        if(val && val.length<6){
            return Promise.reject('The password should be greater then 6 character');
        }
        else{
            return Promise.resolve();
        }
    })
const new_password=body('new_password','New passwords are required')
    .custom(async (val, { req }) => {
        if(val && val.length<6){
            return Promise.reject('The password should be greater then 6 character');
        }
        else{
            return Promise.resolve();
        }
    })

const createStudentValidation=[
    student_name,
    student_username,
    student_email,
    student_password

]
const deleteStudentValidation=[
    student_id
]
const updateStudentValidation=[
    student_name,
    student_username,
    student_email,
    student_password
]
const changePasswordValidation=[
    student_password,
    new_password
]

const studentByIdValidation=[
    student_id
]

module.exports={
    createStudentValidation,
    deleteStudentValidation,
    updateStudentValidation,
    changePasswordValidation,
    studentByIdValidation
}

