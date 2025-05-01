const{validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const{createAdmin,adminList,deleteAdmin}=require('../service/admin.service')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createAdminByPost=async(req,res)=>{
    try{
        const {student_id,department_id,role}=req.body;
        const result=await createAdmin(student_id,department_id,role);
        res.status(201).json({
            success:true,
            data:result
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const adminsListByGet=async(req,res)=>{
    try {
        const result=await adminList();
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Error getting admins list"
        })
    }
}

const deleteAdminByDelete=async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await deleteAdmin(id);
        res.status(200).json({
            success:true,
            message:result
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

}
module.exports = {
    createAdminByPost,
    adminsListByGet,
    deleteAdminByDelete
};