const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const bcrypt = require('bcryptjs');

const createAdmin=async(student_id,department_id,role='admin')=>{
 const student=await db('students').where({student_id:student_id}).first();
 if(!student){
     throw new Error('Student not found');
 }
 const existsAdmin=await db('admins').where({student_id:student_id}).first();
 if(existsAdmin){
     throw new Error('This student is already an admin');
 }
 await db('admins').insert({
     admin_name:student.student_name,
     admin_username:student.student_username,
     admin_email:student.student_email,
     admin_password:student.student_password,
     department_id:department_id,
     role,
     student_id: student.student_id,
     date_of_register:new Date()

 });
 return "Admin added successfully.";
}

const adminList=async(filters={})=>{
    let query=db('admins')

    if(filters.id)query=query.where('admin_id',filters.id);
    if(filters.admin_name) query = query.where('admin_name', 'like', `%${filters.admin_name}%`);
    if(filters.admin_username)query=query.where('admin_username',filters.admin_username);
    if(filters.department_id)query=query.where('department_id',filters.department_id);
    if(filters.role)query=query.where('role',filters.role);

    return await query.select('*');
}

const deleteAdmin=async (id)=>{
    const deleted=await db('admins').where({admin_id:id}).del();
    if(deleted===0){
        throw new Error('Admin not found');
    }
    return "Admin removed successfully.";
}

const updateAdmin=async(admin_id,data)=>{
    const admin= await db('admins').where({admin_id:admin_id}).first();
    const studentId=admin.student_id;
    await db('admins').where({admin_id:admin_id}).update(data);
    const student=await db('students').where({student_id:studentId}).first();
    if(student){
        const studentUpdate = {};
        if (data.admin_name) studentUpdate.student_name = data.admin_name;
        if (data.admin_username) studentUpdate.student_username = data.admin_username;
        if (data.admin_email) studentUpdate.student_email = data.admin_email;
        if (Object.keys(studentUpdate).length > 0) {
            await db('students').where({ student_id: studentId }).update(studentUpdate);
        }
    }
    return true;
}

module.exports={
    createAdmin,
    adminList,
    deleteAdmin,
    updateAdmin
};