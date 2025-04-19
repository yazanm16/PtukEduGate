const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const bcrypt = require('bcryptjs');  // ← استورد bcrypt

const studentCreate = async (
    student_name,
    student_username,
    student_email,
    student_password  // هذه كلمة المرور بالنص الصريح
) => {
    try {
        // 1. أولاً: عمل Salt
        const salt = await bcrypt.genSalt(10);
        // 2. ثم تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(student_password, salt);

        // 3. تخزين الطالب مع كلمة المرور المشفرة
        await db('students').insert({
            student_name: student_name,
            student_username: student_username,
            student_email: student_email,
            student_password: hashedPassword  // ← خزّن الـ hash بدل النص الصريح
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

module.exports = {
    studentCreate,
    studentList
};
