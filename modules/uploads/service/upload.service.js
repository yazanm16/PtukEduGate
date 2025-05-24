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

const approveUploaded=async(uploadId,adminId)=>{
    const upload=await db('upload').where('upload_id',uploadId).first();
    if(!upload) return null;

    if (upload.uploaded_state !== 'pending') {
        throw new Error(`This upload has already been ${upload.uploaded_state}`);
    }
    const insertData={
        exam:'exams',
        book:'books',
        slide:'slides',
        summary:'summaries',
        video:'videos',
    }
    const table=insertData[upload.uploaded_type];
    if(!table) throw new Error('Unsupported uploaded type')

    const exists = await db(table).where({ upload_id: upload.upload_id }).first();
    if (exists) throw new Error('Upload already exists in target table');
    const uploaded={
        upload_id:upload.upload_id,
        course_id:upload.course_id,
        admin_id:adminId,
        doctor_name:upload.doctor_name,
        [`${table.slice(0, -1)}_name`]: upload.upload_name,
        [`${table.slice(0, -1)}_path`]: upload.upload_url,
        description:upload.description,
    }
    await db(table).insert(uploaded);
    await db('upload').where('upload_id',uploadId).update({uploaded_state: 'approved',admin_id:adminId});

return true;
}

const rejectUploaded=async(uploadId,adminId)=>{
    const result=await db('upload').where('upload_id',uploadId).update({uploaded_state: 'rejected',admin_id:adminId});
    return result;
}

const getUploadStudent=async(studentId,filters={})=>{
    let query=db('upload').where('student_id',studentId);
    if(filters.uploaded_state) query=query.where('uploaded_state',filters.uploaded_state);
    if(filters.uploaded_type) query=query.where('uploaded_type',filters.uploaded_type);
    if(filters.course_id) query=query.where('course_id',filters.course_id);

    return await query.select('*');

}


module.exports = {
    createUpload,
    uploadList,
    approveUploaded,
    rejectUploaded,
    getUploadStudent
}