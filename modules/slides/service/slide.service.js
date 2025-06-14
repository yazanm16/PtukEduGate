const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const createSlide=async ({slide_name,course_id,doctor_name,slide_path,admin_id,description})=>{
    await db('slides').insert({
        slide_name,course_id,doctor_name,slide_path,admin_id,upload_id:null,description
    });
}

const getSlide=async (filters={})=>{
    let query=db('slides')
    if(filters.id)query=query.where('slide_id',filters.id);
    if(filters.slide_name)query=query.where('slide_name',filters.slide_name);
    if(filters.course_id)query=query.where('course_id',filters.course_id);
    if(filters.doctor_name)query=query.where('doctor_name',filters.doctor_name);
    if(filters.admin_id)query=query.where('admin_id',filters.admin_id);
    if(filters.upload_id)query=query.where('upload_id',filters.upload_id);

    return await query.select('*');
}

const deleteSlide = async (slide_id, admin_id) => {
    const slide = await db('slides').where('slide_id', slide_id).first();
    if (!slide) return "Slide not found";
    if (!slide.slide_path || typeof slide.slide_path !== 'string') {
        throw new Error("slide_path is null or invalid.");
    }
    const fileName = path.basename(slide.slide_path);
    const oldPath = path.join(__dirname, '..', '..', '..', 'public', slide.slide_path);
    const archivePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'archive', 'slide', fileName);

    await db('favorites').where({ content_type: 'slide', content_id: slide_id }).delete();


    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(path.dirname(archivePath), { recursive: true });
        fs.renameSync(oldPath, archivePath);
    } else {
        console.warn("⚠️ الملف غير موجود في:", oldPath);
    }

    await db('archives').insert({
        content_id: slide_id,
        content_type: 'slide',
        file_path: `archive/slide/${fileName}`,
        deleted_by: admin_id,
        original_data: JSON.stringify(slide)
    });
    await db('slides').where('slide_id', slide_id).delete();

    return true;
};


const updateSlide=async(slide_id,data)=>{
    return await db('slides').where('slide_id',slide_id).update(data);
}
module.exports={
    createSlide,
    getSlide,
    deleteSlide,
    updateSlide
}