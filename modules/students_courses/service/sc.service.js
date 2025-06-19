const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createStudentCourse=async(student_id,course_id)=>{
   const[SC_id]= await db('students_courses').insert({
        student_id,
        course_id
    })
    return SC_id;
}

const deleteStudentCourse=async(SC_id,student_id)=>{
    return await db('students_courses').where({SC_id,student_id}).del();
}

const getStudentCourses=async(student_id)=>{
    const sc=await db('students_courses').where({student_id});

    const result=[];

    for(const s of sc){
        const course=await db('courses').where({course_id:s.course_id}).first();
        result.push({
            SC_id:s.SC_id,
            course_id:s.course_id,
            course_name:course.course_name,
            course_note:course.course_note,
        })
    }
    return result;
}
module.exports = {
    createStudentCourse,
    deleteStudentCourse,
    getStudentCourses

};
