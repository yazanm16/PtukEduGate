const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const slide_id=param('slide_id').isInt().withMessage('slide_id must be an integer')
    .bail()
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

const slide_name =()=> body('slide_name').isString().withMessage('The slide name must be a string')

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

const createSlideValidation=[
    slide_name().optional(),
    doctor_name(),
    course_id,
    description
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
    slide_name().optional(),
    doctor_name().optional(),
    description
]
module.exports={
    createSlideValidation,
    getSlidesValidation,
    deleteSlideValidation,
    updateSlideValidation
}