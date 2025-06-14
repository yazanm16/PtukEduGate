const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const createVideo=async ({video_name,course_id,doctor_name,video_path,admin_id,description})=>{
    await db('videos').insert({
        video_name,course_id,doctor_name,video_path,admin_id,upload_id:null,description
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

const deleteVideo = async (video_id, admin_id) => {
    const video = await db('videos').where('video_id', video_id).first();
    if (!video) return "Video not found";

    if (!video.video_path || typeof video.video_path !== 'string') {
        throw new Error("video_path is null or invalid.");
    }

    const fileName = path.basename(video.video_path);
    const oldPath = path.join(__dirname, '..', '..', '..', 'public', video.video_path);
    const archivePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'archive', 'video', fileName);

    await db('favorites').where({ content_type: 'video', content_id: video_id }).delete();

    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(path.dirname(archivePath), { recursive: true });
        fs.renameSync(oldPath, archivePath);
    } else {
        console.warn("⚠️ الملف غير موجود في:", oldPath);
    }

    await db('archives').insert({
        content_id: video_id,
        content_type: 'video',
        file_path: `archive/video/${fileName}`,
        deleted_by: admin_id,
        original_data: JSON.stringify(video)
    });

    await db('videos').where('video_id', video_id).delete();
    return true;
};


const updateVideo=async(video_id,data)=>{
    return await db('videos').where('video_id',video_id).update(data);
}
module.exports={
    createVideo,
    getVideo,
    deleteVideo,
    updateVideo
}

