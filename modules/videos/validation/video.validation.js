const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const video_id=param('video_id').isInt().withMessage('Video id must be an integer')
    .bail()
    .custom(async (value)=>{
        try {
            const v_id=await db('videos').where('video_id',value).first();
            if(v_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Video not found.");
            }
        }catch (err) {
            return Promise.reject("Video not found.");
        }
    })

const video_name =()=> body('video_name').isString().withMessage('The Video name must be a string')

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

const createVideoValidation=[
    video_name().optional(),
    doctor_name(),
    course_id,
    description
]
const getVideoValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('Course ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('Admin ID must be an integer'),
    query('upload_id').optional().isInt().withMessage('Upload ID must be an integer'),
    query('video_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]

const deleteVideoValidation=[
    video_id
]
const updateVideoValidation=[
    video_id,
    video_name().optional(),
    doctor_name().optional(),
    description
]
module.exports={
   createVideoValidation,
    getVideoValidation,
    deleteVideoValidation,
    updateVideoValidation
}
