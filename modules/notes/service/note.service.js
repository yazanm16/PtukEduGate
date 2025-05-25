const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createNote=async (student_id,content_id,content_type,note_text)=>{
    await db('notes').insert({
        student_id,
        content_id,
        content_type,
        note_text
    });
}

const deleteNote=async(note_id,student_id)=>{
    return await db('notes').where({note_id,student_id}).del();
}
const listNote=async (student_id,content_id,content_type)=>{
    return await db('notes').where({student_id,content_id,content_type}).select('*');

}
const updateNote=async(note_id,note_text,student_id)=>{
    return await db('notes').where({note_id,student_id}).update({note_text,updated_at: db.fn.now()});
}
module.exports={
    createNote,
    deleteNote,
    listNote,
    updateNote
}