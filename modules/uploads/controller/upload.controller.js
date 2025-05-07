const{validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const {createUpload,uploadList}=require('../service/upload.service');

const createUploadByPost=async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try {
        const student_id=req.user.id;
        const upload_url = `${req.protocol}://${req.get('host')}/uploads/${req.body.uploaded_type}/${req.file.filename}`;
        const{course_id,uploaded_type,upload_name,doctor_name,description}=req.body;
        if(!req.file){
            return res.status(400).json({
                success: false,
                message:'File is required',
            })
        }
        const result=await createUpload({student_id,course_id,uploaded_type,upload_name,doctor_name,upload_url,description});
        res.status(201).json({
            success: true,
            message: 'Upload request submitted successfully',
            data: result,
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

const uploadListByGet=async (req, res) => {
    try {
        const filters=req.query;
        const result=await uploadList(filters);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No uploads found',
            });
        }
        res.status(200).json({
            success: true,
            data: result
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

module.exports={
    createUploadByPost,
    uploadListByGet
}