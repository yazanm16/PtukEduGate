const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const student_id=param('student_id').isInt().withMessage('Student ID is must be valid')
    .bail()
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

const student_name=()=>body('student_name').notEmpty().withMessage('Student name is required');

const student_username =()=> body('student_username')
    .notEmpty().withMessage('Student username is required')
    .bail()
    .custom(async (val, { req }) => {
        let query=db('students').where('student_username',val)
        if (req.user && req.user.id) {
            query = query.andWhereNot('student_id', req.user.id);
        }
        const user = await query.first();
        if (user) {
            return Promise.reject('This username already exists');
        }

        return true;
    });


const student_email =()=> body('student_email')
    .notEmpty().withMessage('Student email is required')
    .bail()
    .isEmail().withMessage('Email is not valid')
    .bail()
    .custom(async (val, { req }) => {
        const email = val.toLowerCase();
        let query = db('students').where('student_email', email);
        if (req.user && req.user.id) {
            query = query.andWhereNot('student_id', req.user.id);
        }
        const user = await query.first();
        if (user) {
            return Promise.reject('This email already exists');
        }
        return true;
    })


const student_password=body('student_password','Student passwords are required').notEmpty()
    .bail()
    .custom(async(val)=>{
        if(val && val.length<6){
            return Promise.reject('The password should be greater then 6 character');
        }
        else{
            return Promise.resolve();
        }
    })
const new_password=body('new_password','New passwords are required')
    .bail()
    .custom(async (val, { req }) => {
        if(val && val.length<6){
            return Promise.reject('The password should be greater then 6 character');
        }
        else{
            return Promise.resolve();
        }
    })

const confirmPassword=body('confirmPassword').notEmpty().withMessage('Confirm passwords are required')
    .bail()
    .isLength({min:6}).withMessage('Password must be at least 6 characters')

const createStudentValidation=[
    student_name(),
    student_username(),
    student_email(),
    student_password

]
const deleteStudentValidation=[
    student_id
]
const updateStudentValidation=[
    student_name().optional(),
    student_username().optional(),
    student_email().optional(),
]
const changePasswordValidation=[
    student_password,
    new_password,
    confirmPassword
]

const studentByIdValidation=[
    student_id
]

const getStudentsValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('student_name').optional().isString().trim(),
    query('student_username').optional().isString().trim(),
]
module.exports={
    createStudentValidation,
    deleteStudentValidation,
    updateStudentValidation,
    changePasswordValidation,
    studentByIdValidation,
    getStudentsValidation
}

