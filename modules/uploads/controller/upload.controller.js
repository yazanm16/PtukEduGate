const{validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const {createUpload,uploadList,approveUploaded,rejectUploaded,getUploadStudent}=require('../service/upload.service');

const createUploadByPost=async (req, res) => {
    try {
        const student_id=req.user.id;
        const upload_url = `uploads/${req.body.uploaded_type}/${req.file.filename}`;
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

const handleUploadApprovalByPut=async (req, res) => {
    try{
        const {upload_id} = req.params;
        const {action}=req.body;
        const adminID=req.user.id;
        let result;
        if(action==='approved'){
            result=await approveUploaded(upload_id,adminID)
        }
        else {
            result=await rejectUploaded(upload_id,adminID)
        }

        if (!result){
            return res.status(400).json({
                success: false,
                message:"No uploads found",
            })
        }
        res.status(200).json({
            success: true,
            message: `Upload has been ${action} successfully.`,
        });

    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}

const getUploadByFiltersForStudent=async (req, res) => {
    try{
        const student_id=req.user.id;
        const filters={
            uploaded_state:req.query.uploaded_state,
            uploaded_type: req.query.uploaded_type,
            course_id:req.query.course_id
        }
        const result=await getUploadStudent(student_id,filters);
        if (!result||result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No uploads found",
            })
        }
        res.status(200).json({
            success: true,
            data: result
        })
    }catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

module.exports={
    createUploadByPost,
    uploadListByGet,
    handleUploadApprovalByPut,
    getUploadByFiltersForStudent
}