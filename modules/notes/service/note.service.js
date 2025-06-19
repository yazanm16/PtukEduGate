const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createNote=async (student_id,content_id,content_type,note_text,note_title)=>{
    await db('notes').insert({
        student_id,
        content_id,
        content_type,
        note_text,
        note_title
    });
}

const deleteNote=async(note_id,student_id)=>{
    return await db('notes').where({note_id,student_id}).del();
}
const listNote=async (student_id,content_id,content_type)=>{
    return await db('notes').where({student_id,content_id,content_type}).select('*');

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