const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);


const createBook=async ({book_name,course_id,doctor_name,book_path,admin_id})=>{
    await db('books').insert({
        book_name,course_id,doctor_name,book_path,admin_id,upload_id:null
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

const deleteBook=async(book_id)=>{
    const book=await db('books').where('book_id',book_id).first();
    if(!book)return "book not found";
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'book', path.basename(book.book_path));
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    await db('favorites').where({content_type:'book',content_id:book_id}).delete();
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