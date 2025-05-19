const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const summary_id=body('summary_id').isInt().withMessage('summary id must be an integer')
    .custom(async (value)=>{
        try {
            const s_id=await db('summaries').where('summary_id',value).first();
            if(s_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Summary not found.");
            }
        }catch (err) {
            return Promise.reject("Summary not found.");
        }
    })

const summary_name = body('summary_name').notEmpty().withMessage('The summary name is required')
.isString().withMessage('The Summary name must be a string')

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

const createSummaryValidation=[
    summary_name,
    doctor_name,
    course_id
]
const getSummaryValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('Course ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('Admin ID must be an integer'),
    query('upload_id').optional().isInt().withMessage('Upload ID must be an integer'),
    query('summary_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]

const deleteSummaryValidation=[
    summary_id
]
const updateSummaryValidation=[
    summary_id,
    summary_name.optional(),
    doctor_name.optional()
]
module.exports={
   createSummaryValidation,
    getSummaryValidation,
    deleteSummaryValidation,
    updateSummaryValidation
}
