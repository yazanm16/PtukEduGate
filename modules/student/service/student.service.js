const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const bcrypt = require('bcryptjs');

const studentCreate = async (
    student_name,
    student_username,
    student_email,
    student_password
) => {


        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(student_password, salt);


        const[student_id]= await db('students').insert({
            student_name: student_name,
            student_username: student_username,
            student_email: student_email,
            student_password: hashedPassword
        });
        return {
            id:student_id,
            name:student_name,
            username:student_username,
            email:student_email,
        }


};

const studentList=async (filters={})=>{
    let query=db('students');
    if(filters.id)query=query.where('student_id',filters.id);
    if(filters.student_name)query=query.where('student_name','like', `%${filters.student_name}%`);
    if(filters.student_username)query=query.where('student_username',filters.student_username);

    return await query.select('*');

}

const getStudentProfile=async(studentId)=>{
    const student=await db('students').select('student_id','student_name','student_username','student_email','date_of_register')
        .where('student_id',studentId).first();

    return student;
}

const deleteStudent=async(studentId)=>{
    const deleted = await db('students').where('student_id',studentId).del();
    return deleted;
}

const updateStudent=async(studentId,data)=>{
    return await db('students').where('student_id',studentId).update(data);
}




module.exports = {
    studentCreate,
    studentList,
    getStudentProfile,
    deleteStudent,
    updateStudent,

};
