const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);


const createAssignment=async ({assignment_name,course_id,doctor_name,assignment_path,admin_id,description})=>{
    await db('assignments').insert({
        assignment_name,course_id,doctor_name,assignment_path,admin_id,upload_id:null,description
    });
}

const getAssignment=async (filters={})=>{
    let query=db('assignments')
    if(filters.id)query=query.where('assignment_id',filters.id);
    if(filters.assignment_name)query=query.where('assignment_name',filters.assignment_name);
    if(filters.course_id)query=query.where('course_id',filters.course_id);
    if(filters.doctor_name)query=query.where('doctor_name',filters.doctor_name);
    if(filters.admin_id)query=query.where('admin_id',filters.admin_id);
    if(filters.upload_id)query=query.where('upload_id',filters.upload_id);

    return await query.select('*');
}

const deleteAssignment=async(assignment_id)=>{
    const assignment=await db('assignments').where('assignment_id',assignment_id).first();
    if(!assignment)return "Assignment not found";
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'assignment', path.basename(assignment.assignment_path));
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    await db('favorites').where({content_type:'assignment',content_id:assignment_id}).delete();
    await db('assignments').where('assignment_id',assignment_id).delete();
    return true;
}

const updateAssignment=async(assignment_name,data)=>{
    return await db('assignments').where('assignment_name',assignment_name).update(data);
}

module.exports={
    createAssignment,
    getAssignment,
    deleteAssignment,
    updateAssignment
}
