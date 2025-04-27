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



module.exports={
    createAdmin
};