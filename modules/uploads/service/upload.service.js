const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const bcrypt = require('bcryptjs');

const createUpload=async ({student_id,course_id,uploaded_type,upload_name,doctor_name,upload_url,description}) => {
    const result=await db('upload').insert({
        student_id,
        course_id,
        uploaded_type,
        upload_name,
        description,
        doctor_name,
        upload_url,
        uploaded_state:'pending'
    })
    return result
}

const uploadList=async(filters={})=>{
    let query=db('upload')
    if(filters.id) query=query.where('upload_id',filters.id);
    if(filters.student_id) query=query.where('student_id',filters.student_id);
    if(filters.admin_id) query=query.where('admin_id',filters.admin_id);
    if(filters.course_id) query=query.where('course_id',filters.course_id);
    if(filters.uploaded_state)query=query.where('uploaded_state',filters.uploaded_state);
    if(filters.uploaded_type)query=query.where('uploaded_type',filters.uploaded_type);
    if(filters.doctor_name)query = query.where('doctor_name', 'like', `%${filters.doctor_name}%`);
    if(filters.doctor_name)query = query.where('upload_name', 'like', `%${filters.upload_name}%`);



return await query.select('*');
}





module.exports = {
    createUpload,
    uploadList
}