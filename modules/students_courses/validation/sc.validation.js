const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const SC_id=param('SC_id').isInt().withMessage('Student Courses ID must be an integer')
    .custom(async(value)=>{
        try {
            const cs_id=await db('students_courses').where('SC_id',value).first()
            if(cs_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Student Courses not found.");
            }
        }catch(err){
            return Promise.reject("Student Courses not found.");
        }
    })

const course_id=body('course_id').isInt().withMessage('Course ID must be an integer')
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

const student_id=body('student_id').isInt().withMessage('Student ID is must be valid')
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

const createStudentCourseValidation=[
    course_id
]
const deleteStudentCourseValidation=[
    SC_id
]
module.exports={
createStudentCourseValidation,
    deleteStudentCourseValidation
}

