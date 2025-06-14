const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const createSummary=async ({summary_name,course_id,doctor_name,summary_path,admin_id,description})=>{
    await db('summaries').insert({
        summary_name,course_id,doctor_name,summary_path,admin_id,upload_id:null,description
    });
}

const getSummary=async (filters={})=>{
    let query=db('summaries')
    if(filters.id)query=query.where('summary_id',filters.id);
    if(filters.summary_name)query=query.where('summary_name',filters.summary_name);
    if(filters.course_id)query=query.where('course_id',filters.course_id);
    if(filters.doctor_name)query=query.where('doctor_name',filters.doctor_name);
    if(filters.admin_id)query=query.where('admin_id',filters.admin_id);
    if(filters.upload_id)query=query.where('upload_id',filters.upload_id);

    return await query.select('*');
}

const deleteSummary = async (summary_id, admin_id) => {
    const summary = await db('summaries').where('summary_id', summary_id).first();
    if (!summary) return "Summary not found";

    if (!summary.summary_path || typeof summary.summary_path !== 'string') {
        throw new Error("summary_path is null or invalid.");
    }
    const fileName = path.basename(summary.summary_path);
    const oldPath = path.join(__dirname, '..', '..', '..', 'public', summary.summary_path);
    const archivePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'archive', 'summary', fileName);

    await db('favorites').where({ content_type: 'summary', content_id: summary_id }).delete();

    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(path.dirname(archivePath), { recursive: true });
        fs.renameSync(oldPath, archivePath);
    } else {
        console.warn("⚠️ الملف غير موجود في:", oldPath);
    }

    await db('archives').insert({
        content_id: summary_id,
        content_type: 'summary',
        file_path: `archive/summary/${fileName}`,
        deleted_by: admin_id,
        original_data: JSON.stringify(summary)
    });

    await db('summaries').where('summary_id', summary_id).delete();

    return true;
};


const updateSummary=async(summary_id,data)=>{
    return await db('summaries').where('summary_id',summary_id).update(data);
}
module.exports={
    createSummary,
    getSummary,
    deleteSummary,
    updateSummary
}
