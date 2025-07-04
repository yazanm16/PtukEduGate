const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);


const createExam=async ({exam_name,course_id,doctor_name,exam_path,admin_id,description})=>{
    await db('exams').insert({
        exam_name,course_id,doctor_name,exam_path,admin_id,upload_id:null,description
    });
}

const getExam=async (filters={})=>{
    let query=db('exams')
    if(filters.id)query=query.where('exam_id',filters.id);
    if(filters.exam_name)query=query.where('exam_name',filters.exam_name);
    if(filters.course_id)query=query.where('course_id',filters.course_id);
    if(filters.doctor_name)query=query.where('doctor_name',filters.doctor_name);
    if(filters.admin_id)query=query.where('admin_id',filters.admin_id);
    if(filters.upload_id)query=query.where('upload_id',filters.upload_id);

    return await query.select('*');
}

const deleteExam = async (exam_id, admin_id) => {
    const exam = await db('exams').where('exam_id', exam_id).first();
    if (!exam) return "Exam not found";
    if (!exam.exam_path || typeof exam.exam_path !== 'string') {
        throw new Error("exam_path is null or invalid.");
    }
    const fileName = path.basename(exam.exam_path);
    const oldPath = path.join(__dirname, '..', '..', '..', 'public', exam.exam_path);
    const archivePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'archive', 'exam', fileName);
    await db('favorites').where({ content_type: 'exam', content_id: exam_id }).delete();
    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(path.dirname(archivePath), { recursive: true });
        fs.renameSync(oldPath, archivePath);
    } else {
        console.warn("⚠️ الملف غير موجود في المسار:", oldPath);
    }
    await db('archives').insert({
        content_id: exam_id,
        content_type: 'exam',
        file_path: `archive/exam/${fileName}`,
        deleted_by: admin_id,
        original_data: JSON.stringify(exam)
    });

    await db('exams').where('exam_id', exam_id).delete();

    return true;
};


const updateExam=async(exam_id,data)=>{
    return await db('exams').where('exam_id',exam_id).update(data);
}
module.exports={
    createExam,
    getExam,
    deleteExam,
    updateExam
}