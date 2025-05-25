const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createNote,deleteNote,listNote, updateNote} = require("../service/note.service");
const db = knex(knexConfig);

const createNoteByPost=async (req,res)=>{
try{
    let student_id = req.user.id;

    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
        const admin = await db('admins').where({ admin_id: req.user.id }).first();
        student_id = admin.student_id;
    }
    const {content_id,content_type,note_text}=req.body;
    const result=await createNote(student_id,content_id,content_type,note_text);
    return res.status(201).json({
        success:true,
        message:"Note added successfully",
    })
}catch (err){
    console.log(err);
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
}}

const deleteNoteByDelete=async (req,res)=>{
    try {
        let student_id = req.user.id;

        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({admin_id: req.user.id}).first();
            student_id = admin.student_id;
        }
        const {note_id}=req.params;
        const result=await deleteNote(note_id,student_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Note not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Note deleted successfully",
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const listNotesByGet=async (req,res)=>{
    try {
        let student_id = req.user.id;

        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({admin_id: req.user.id}).first();
            student_id = admin.student_id;
        }
        const{content_id,content_type}=req.body;
        const result=await listNote(student_id,content_id,content_type);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"No notes found"
            })
        }
        return res.status(200).json({
                success: true,
                data: result
            })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateNoteByPut=async (req,res)=>{
    try {let student_id = req.user.id;

        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({admin_id: req.user.id}).first();
            student_id = admin.student_id;
        }
        const {note_id}=req.params;
        const {note_text}=req.body;
        const result=await updateNote(note_id,note_text,student_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Note not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Note updated successfully",
        })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports={
    createNoteByPost,
    deleteNoteByDelete,
    listNotesByGet,
    updateNoteByPut
}