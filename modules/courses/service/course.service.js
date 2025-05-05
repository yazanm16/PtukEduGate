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

const coursesList=async(filters={})=>{
    let query=db('courses')
    if(filters.id)query=query.where('course_id',filters.id);
    if(filters.course_name)query=query.where('course_name',filters.course_name);

    return await query.select('*');
}


const updateCourse=async(course_id,data)=>{
    return await db('courses').where('course_id',course_id).update(data);
}

const deleteCourse=async(course_id)=>{
    return await db('courses').where('course_id',course_id).delete();
}


module.exports={
    createCourse,
    coursesList,
    updateCourse,
    deleteCourse,

}