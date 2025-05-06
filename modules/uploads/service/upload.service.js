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
module.exports = {
    createUpload
}