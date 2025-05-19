const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const createSummary=async ({summary_name,course_id,doctor_name,summary_path,admin_id})=>{
    await db('summaries').insert({
        summary_name,course_id,doctor_name,summary_path,admin_id,upload_id:null
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

const deleteSummary=async(summary_id)=>{
    const summary=await db('summaries').where('summary_id',summary_id).first();
    if(!summary)return "summary not found";
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'summary', path.basename(summary.summary_path));
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    await db('summaries').where('summary_id',summary_id).delete();
    return true;
}

const updateSummary=async(summary_id,data)=>{
    return await db('summaries').where('summary_id',summary_id).update(data);
}
module.exports={
    createSummary,
    getSummary,
    deleteSummary,
    updateSummary
}
