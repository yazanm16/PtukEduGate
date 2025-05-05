const{body,param, query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const router = require("../../../routes");
const {updateCourse} = require("../service/course.service");
const db = knex(knexConfig);

const course_id=param('course_id').isInt().withMessage('The course ID is required')
    .custom(async(value)=>{
        try {
            const c_id=await db('courses').where({course_id:course_id}).first();
            if(c_id){
                return Promise.resolve("not found");
            }
            else{
                return Promise.reject("Course not found.");
            }
        }catch(err){

        }
    })

const course_name=body('course_name').notEmpty().withMessage('The course name is required');

const course_note=body('course_note').optional().isString().withMessage('Course note must be a string');


const createCourseValidation=[
    course_name,course_note
]
const updateCourseValidation=[
    course_id,
    course_name,
    course_note
]
const deleteCourseValidation=[
    course_id
]
const getCoursesValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('course_name').optional().isString().trim(),
]

module.exports={
    createCourseValidation,
    updateCourseValidation,
    deleteCourseValidation,
    getCoursesValidation
}