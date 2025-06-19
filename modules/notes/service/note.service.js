const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createNote=async (student_id,content_id,content_type,note_text,note_title)=>{
   const [note_id]= await db('notes').insert({
        student_id,
        content_id,
        content_type,
        note_text,
        note_title
    });
   return await db('notes').where('note_id',note_id).first();
}


const deleteNote=async(note_id,student_id)=>{
    return await db('notes').where({note_id,student_id}).del();
}
const listNote=async (student_id,filters={})=>{
    let query=  db('notes').where({student_id})
    if(filters.content_id)query=query.andWhere('content_id',filters.content_id);
    if(filters.content_type)query=query.andWhere('content_type',filters.content_type);


return await query.select('*');
}
const updateNote=async(note_id,student_id,data)=>{
    return await db('notes').where({note_id,student_id}).update({...data,updated_at: db.fn.now()});
}
module.exports={
    createNote,
    deleteNote,
    listNote,
    updateNote
}