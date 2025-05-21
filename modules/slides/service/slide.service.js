const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const createSlide=async ({slide_name,course_id,doctor_name,slide_path,admin_id})=>{
    await db('slides').insert({
        slide_name,course_id,doctor_name,slide_path,admin_id,upload_id:null
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

const deleteSlide=async(slide_id)=>{
    const slide=await db('slides').where('slide_id',slide_id).first();
    if(!slide)return "slide not found";
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'slide', path.basename(slide.slide_path));
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    await db('favorites').where({content_type:'slide',content_id:slide_id}).delete();
    await db('slides').where('slide_id',slide_id).delete();
    return true;
}

const updateSlide=async(slide_id,data)=>{
    return await db('slides').where('slide_id',slide_id).update(data);
}
module.exports={
    createSlide,
    getSlide,
    deleteSlide,
    updateSlide
}