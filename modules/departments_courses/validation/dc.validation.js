const{body,param, query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const dc_id=param('dc_id').isInt().withMessage('The department course ID is required')
    .bail()
    .custom(async(value)=>{
        try {
            const dc_id=await db('departments_courses').where({dc_id:value}).first();
            if(dc_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Department Course not found.");
            }
        }
        catch (err){
            return Promise.reject("Department Course not found.");
        }
    })
const course_id=()=>body('course_id').isInt().withMessage('The course ID is required')
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

const departments_id=()=>body('departments_id').isInt().withMessage('Department ID is must be valid')
    .bail()
    .custom(async(val)=>{
        try {
            const d_id=await db('departments').where('departments_id',val).first();
            if(d_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject('No such Department');
            }
        }catch(e){
            return Promise.reject('No such Department');
        }
    })

const dc_type=()=>body('dc_type').notEmpty().withMessage('Department Type is required')


const linkDepartmentWithCourseValidation=[
    course_id(),
    departments_id(),
    dc_type()
]

const getDepartmentCoursesValidation=[
    query('department_id').optional().isInt().withMessage('Department ID must be an integer'),
    query('dc_type').optional().isString().withMessage('Type must be string')
]
const updateDepartmentCourseValidation=[
    dc_id,
    course_id().optional(),
    departments_id().optional(),
    dc_type().optional()
]
const deleteDepartmentCourseValidation=[
    dc_id
]
module.exports={
    linkDepartmentWithCourseValidation,
    getDepartmentCoursesValidation,
    updateDepartmentCourseValidation,
    deleteDepartmentCourseValidation
}