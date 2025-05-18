const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const slide_id=body('slide_id').isInt().withMessage('slide_id must be an integer')
    .custom(async (value)=>{
        try {
            const s_id=await db('slides').where('slide_id',value).first();
            if(s_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Slide not found.");
            }
        }catch (err) {
            return Promise.reject("Slide not found.");
        }
    })

const slide_name = body('slide_name').notEmpty().withMessage('The slide name is required')
.isString().withMessage('The slide name must be a string')

const doctor_name = body('doctor_name')
    .optional({ nullable: true })
    .isLength({ max: 255 }).withMessage('Doctor name is too long');

const course_id=body('course_id').isInt().withMessage('The course ID is required')
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

const createSlideValidation=[
    slide_name,
    doctor_name,
    course_id
]
const getSlidesValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('Course ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('Admin ID must be an integer'),
    query('upload_id').optional().isInt().withMessage('Upload ID must be an integer'),
    query('slide_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]

const deleteSlideValidation=[
    slide_id
]
const updateSlideValidation=[
    slide_id,
    slide_name.optional(),
    doctor_name.optional()
]
module.exports={
    createSlideValidation,
    getSlidesValidation,
    deleteSlideValidation,
    updateSlideValidation
}