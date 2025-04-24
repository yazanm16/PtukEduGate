const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const createCourse=async(course_name,course_note)=>{
try{
    await db('courses').insert({
        course_name:course_name,
        course_note:course_note,
    });

}catch(err){
console.log(err);
return "failed to create course";
}
}

const coursesList=async()=>{
    try{
        return await db('courses').select('course_id','course_name','course_note');

    }
    catch(err){
        return "error";
    }
}


const updateCourse=async(course_id,data)=>{
    return await db('courses').where('course_id',course_id).update(data);
}

const deleteCourse=async(course_id)=>{
    return await db('courses').where('course_id',course_id).delete();
}

const getCourse=async(course_id)=>{
    return await db('courses').where('course_id',course_id).select('course_id','course_name','course_note').first();

}
module.exports={
    createCourse,
    coursesList,
    updateCourse,
    deleteCourse,
    getCourse
}