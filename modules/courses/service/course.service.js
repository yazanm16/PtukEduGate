const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const createCourse=async(course_name,course_note)=>{
try{
    await db('courses').insert({
        course_name:course_name,
        course_note:course_note,
    });
    return "the course created successfully";

}catch(err){
console.log(err);
return "failed to create course";
}
}
module.exports={
    createCourse
}