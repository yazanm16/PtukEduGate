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
    const reasons=[]
    const existBook=await db('books').where('course_id',course_id).first();
    if(existBook) reasons.push("can't delete course because there is a book connected to it") ;
    const existExam=await db('exams').where('course_id',course_id).first();
    if(existExam) reasons.push("can't delete course because there is an exam connected to it") ;
    const existSlides=await db('slides').where('course_id',course_id).first();
    if(existSlides) reasons.push("can't delete course because there is a slides connected to it") ;
    const existVideo=await db('videos').where('course_id',course_id).first();
    if(existVideo) reasons.push("can't delete course because there is a video connected to it") ;
    const existSummary=await db('summaries').where('course_id',course_id).first();
    if(existSummary) reasons.push("can't delete course because there is a summary connected to it") ;
    const exitDepartment=await db('departments_courses').where('course_id',course_id).first();
    if(exitDepartment) reasons.push("can't delete course because there is an department connected to it") ;
    if (reasons.length > 0) {
        return { status: 'blocked', reasons };
    }
    await db('upload').where('course_id',course_id).del();
    const deleted= await db('courses').where('course_id',course_id).delete();
    return deleted===0 ?{status:'not_found'} : {status:'deleted'}
}


module.exports={
    createCourse,
    coursesList,
    updateCourse,
    deleteCourse,

}