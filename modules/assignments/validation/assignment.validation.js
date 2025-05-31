const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const assignment_id=param('assignment_id').isInt().withMessage('assignment_id must be an integer')
    .bail()
    .custom(async (value)=>{
        try {
            const a_id=await db('assignments').where('assignment_id',value).first();
            if(a_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Assignment not found.");
            }
        }catch (err) {
            return Promise.reject("Assignment not found.");
        }
    })


const assignment_name =()=>body('assignment_name').isString().withMessage('The Assignment name must be a string')

const doctor_name =()=> body('doctor_name')
    .optional({ nullable: true })
    .isLength({ max: 255 }).withMessage('Doctor name is too long');

const course_id=body('course_id').isInt().withMessage('The course ID is required')
    .bail()
    .custom(async(value)=>{
        try {
            const c_id=await db('courses').where({course_id:value}).first();
            if(c_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Course not found.");
            }
        }catch(err){
            return Promise.reject("Course not found.");
        }
    })

const description = body('description')
    .optional({ nullable: true })
    .isString().withMessage('Description must be text');

const createAssignmentValidation=[
    assignment_name().optional(),
    doctor_name(),
    course_id,
    description
]
const getAssignmentValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('Course ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('Admin ID must be an integer'),
    query('upload_id').optional().isInt().withMessage('Upload ID must be an integer'),
    query('assignment_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]

const deleteAssignmentValidation=[
    assignment_id
]
const updateAssignmentValidation=[
    assignment_id,
    assignment_name().optional(),
    doctor_name().optional(),
    description
]
module.exports={
    createAssignmentValidation,
    getAssignmentValidation,
    deleteAssignmentValidation,
    updateAssignmentValidation

}