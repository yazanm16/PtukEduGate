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
        const student= await db('students').where({student_id}).first()
        return {
            id:student.student_id,
            name:student.student_name,
            username:student.student_username,
            email:student.student_email,
            date_of_register:student.date_of_register,
            role:'student',
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
    const reasons=[]
    const existAdmin=await db('admins').where('student_id',studentId).first();
    if(existAdmin)reasons.push("student has admin, can't delete");
    if (reasons.length > 0) {
        return { status: 'blocked', reasons };
    }
    const deleted = await db('students').where('student_id',studentId).del();
    if(deleted===0) return {status:'not_found'};

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
