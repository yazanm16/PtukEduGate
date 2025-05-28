const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const exam_id=param('exam_id').isInt().withMessage('exam_id must be an integer')
    .bail()
    .custom(async (value)=>{
        try {
            const e_id=await db('exams').where('exam_id',value).first();
            if(e_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Exam not found.");
            }
        }catch (err) {
            return Promise.reject("Exam not found.");
        }
    })


const exam_name =()=>body('exam_name').isString().withMessage('The exam name must be a string')

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

const createExamValidation=[
    exam_name().optional(),
    doctor_name(),
    course_id,
    description
]
const getExamValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('Course ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('Admin ID must be an integer'),
    query('upload_id').optional().isInt().withMessage('Upload ID must be an integer'),
    query('exam_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]

const deleteExamValidation=[
    exam_id
]
const updateExamValidation=[
    exam_id,
    exam_name().optional(),
    doctor_name().optional(),
    description
]
module.exports={
    createExamValidation,
    getExamValidation,
    deleteExamValidation,
    updateExamValidation
}