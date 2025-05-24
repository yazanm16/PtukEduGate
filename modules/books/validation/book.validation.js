const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const book_id=param('book_id').isInt().withMessage('book_id must be an integer')
    .bail()
    .custom(async (value)=>{
        try {
            const b_id=await db('books').where('book_id',value).first();
            if(b_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Book not found.");
            }
        }catch (err) {
            return Promise.reject("Book not found.");
        }
    })


const book_name =()=> body('book_name').notEmpty().withMessage('The book name is required')
    .bail()
    .isString().withMessage('The book name must be a string')

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

const createBookValidation=[
    book_name(),
    doctor_name(),
    description,
    course_id
]
const getBooksValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_id').optional().isInt().withMessage('Course ID must be an integer'),
    query('admin_id').optional().isInt().withMessage('Admin ID must be an integer'),
    query('upload_id').optional().isInt().withMessage('Upload ID must be an integer'),
    query('book_name').optional().isString().trim(),
    query('doctor_name').optional().isString().trim()
]

const deleteBookValidation=[
    book_id
]
const updateBookValidation=[
    book_id,
    book_name().optional(),
    doctor_name().optional(),
    description
]
module.exports={
    createBookValidation,
    getBooksValidation,
    deleteBookValidation,
    updateBookValidation
}