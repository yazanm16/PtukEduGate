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
    try {

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(student_password, salt);


        await db('students').insert({
            student_name: student_name,
            student_username: student_username,
            student_email: student_email,
            student_password: hashedPassword
        });

        return "The student was added successfully";
    } catch (err) {
        console.error(err);
        return "Failed to add the student";
    }
};

const studentList=async ()=>{
    try {
        return await db('students').select('student_id','student_name','student_username','student_email','date_of_register');
    }catch(err){
        return "error";
    }
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

module.exports = {
    studentCreate,
    studentList,
    getStudentProfile,
    deleteStudent
};
