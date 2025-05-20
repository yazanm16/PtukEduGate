const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const createVideo=async ({video_name,course_id,doctor_name,video_path,admin_id})=>{
    await db('videos').insert({
        video_name,course_id,doctor_name,video_path,admin_id,upload_id:null
    });
}

const getVideo=async (filters={})=>{
    let query=db('videos')
    if(filters.id)query=query.where('video_id',filters.id);
    if(filters.video_name)query=query.where('video_name',filters.video_name);
    if(filters.course_id)query=query.where('course_id',filters.course_id);
    if(filters.doctor_name)query=query.where('doctor_name',filters.doctor_name);
    if(filters.admin_id)query=query.where('admin_id',filters.admin_id);
    if(filters.upload_id)query=query.where('upload_id',filters.upload_id);

    return await query.select('*');
}

const deleteVideo=async(video_id)=>{
    const Video=await db('videos').where('video_id',video_id).first();
    if(!Video)return "Video not found";
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'video', path.basename(Video.video_path));
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    await db('videos').where('video_id',video_id).delete();
    return true;
}

const updateVideo=async(video_id,data)=>{
    return await db('videos').where('video_id',video_id).update(data);
}
module.exports={
    createVideo,
    getVideo,
    deleteVideo,
    updateVideo
}

