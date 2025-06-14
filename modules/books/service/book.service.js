const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);


const createBook=async ({book_name,course_id,doctor_name,book_path,admin_id,description})=>{
    await db('books').insert({
        book_name,course_id,doctor_name,book_path,admin_id,upload_id:null,description
    });
}

const getBook=async (filters={})=>{
    let query=db('books')
    if(filters.id)query=query.where('book_id',filters.id);
    if(filters.book_name)query=query.where('book_name',filters.book_name);
    if(filters.course_id)query=query.where('course_id',filters.course_id);
    if(filters.doctor_name)query=query.where('doctor_name',filters.doctor_name);
    if(filters.admin_id)query=query.where('admin_id',filters.admin_id);
    if(filters.upload_id)query=query.where('upload_id',filters.upload_id);

    return await query.select('*');
}

const deleteBook=async(book_id,admin_id)=>{
    const book=await db('books').where('book_id',book_id).first();
    if(!book)return "book not found";
    if (!book.book_path || typeof book.book_path !== 'string') {
        throw new Error("book_path is null or invalid.");
    }

    const fileName=path.basename(book.book_path);
    const oldPath = path.join(__dirname, '..', '..', '..', 'public',book.book_path);
    const archivePath=path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'archive','book',fileName);
    await db('favorites').where({content_type:'book',content_id:book_id}).delete();

    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(path.dirname(archivePath), { recursive: true });
        fs.renameSync(oldPath, archivePath);
    } else {
        console.warn("⚠️ الملف غير موجود في المسار:", oldPath);
    }
    await db('archives').insert({
        content_id:book_id,
        content_type: 'book',
        file_path: `archive/book/${fileName}`,
        deleted_by:admin_id,
        original_data: JSON.stringify(book)
    })
    await db('books').where('book_id',book_id).delete();
    return true
}

const updateBook=async(book_id,data)=>{
    return await db('books').where('book_id',book_id).update(data);
}
module.exports={
    createBook,
    getBook,
    deleteBook,
    updateBook
}