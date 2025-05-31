const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const upload_id=param('upload_id').isInt().withMessage('the upload_id is required')
    .bail()
    .custom(async(value)=>{
        try {
            const ap_id=await db('upload').where({upload_id:value}).first();
            if(ap_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Upload not found.");
            }
        }catch(err){
            return Promise.reject("Upload not found.");
        }
    })

const student_id=body('student_id').isInt().withMessage('the student id is required')
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

const admin_id=body('admin_id').isInt().withMessage('Admin ID is must be valid')
    .bail()
    .custom(async(val)=>{
        try{
            const ad_id=await db('admins').where('admin_id',val).first();
            if(ad_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject('no admin ID found.');
            }
        }catch(err){
            return Promise.reject('no admin ID found.');
        }
    })

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

const uploaded_type=body('uploaded_type').notEmpty().withMessage('The uploaded type is required').bail()
    .isIn(['book', 'exam', 'slide', 'summary', 'video','assignment']).withMessage('Invalid upload type');

const upload_name = body('upload_name')
    .optional({ nullable: true })
    .isLength({ max: 255 }).withMessage('Upload name is too long');

const doctor_name = body('doctor_name')
    .optional({ nullable: true })
    .isLength({ max: 255 }).withMessage('Doctor name is too long');

const upload_url = body('upload_url')
    .optional({ nullable: true })
    .isURL().withMessage('Upload URL must be a valid URL');

const description = body('description')
    .optional({ nullable: true })
    .isString().withMessage('Description must be text');

const action= body('action').notEmpty().isIn(['approved', 'rejected']).withMessage('Action must be approved or rejected')
const createUploadValidation=[
    course_id,
    uploaded_type,
    upload_name,
    doctor_name,
    upload_url,
    description
]
const getUploadValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('student_id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('ID must be an integer'),
    query('uploaded_state').optional().isIn(['pending','approved','rejected']).withMessage('Invalid upload state'),
    query('uploaded_type').optional().isIn(['book', 'exam', 'slide', 'summary', 'video','assignment']).withMessage('Invalid upload type'),
    query('upload_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]
const approveUploadValidation=[
    upload_id,action.optional()
]

const getUploadsStudent=[
    query('uploaded_state').optional().isIn(['pending','approved','rejected']).withMessage('Invalid upload state'),
    query('uploaded_type').optional().isIn(['book', 'exam', 'slide', 'summary', 'video','assignment']).withMessage('Invalid upload type'),
    query('course_id').optional().isInt().withMessage('ID must be an integer'),


]

module.exports ={
    createUploadValidation,
    getUploadValidation,
    approveUploadValidation,
    getUploadsStudent
}