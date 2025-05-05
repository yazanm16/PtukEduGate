const{validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const{createAdmin,adminList,deleteAdmin,updateAdmin,adminProfile,changeAdminPass}=require('../service/admin.service')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const err = require("nodemailer/lib/mail-composer");
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
        const filters=req.query;
        const result=await adminList(filters);
        if(!result){
            res.status(404).json({
                success:false,
                message:"no admins found"
            })
        }
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
    console.error(err);
    res.status(500).json({
        success:false,
        message:"Something went wrong"
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

const updateAdminByPut=async(req,res)=>{
    try {
        const adminId=req.user.id;
        let{admin_name,admin_username,admin_email}=req.body;
        const updateData={}
        if(admin_name){
            updateData.admin_name=admin_name;
        }
        if(admin_username){
            updateData.admin_username=admin_username;
        }
        if(admin_email){
            updateData.admin_email=admin_email;
        }
        if(Object.keys(updateData).length===0){
            return res.status(404).json({
                success:false,
                message:"No Data Found"
            })
        }
        const result=await updateAdmin(adminId,updateData);
        if(!result){
            res.status(404).json({
                success:false,
                message:"Admin not found or no changes made"
            })
        }
        res.status(200).json({
            success:true,
            message:"Successfully updated Admin"
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Error updating Admin"
        })
    }
}

const getAdminProfileByGet=async(req,res)=>{
    try {
        const adminId=req.user.id;
        const result=await adminProfile(adminId);
        if(!result){
            res.status(404).json({
                success:false,
                message:"No Data Found"
            })
        }
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const changeAdminPasswordByPut=async(req,res)=>{
    try{
        const adminId=req.user.id;
        const{admin_password,new_password}=req.body;
        const result=await changeAdminPass(adminId,admin_password,new_password);
        res.status(200).json({
            success:true,
            message:result
        })
    }catch (err) {
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports = {
    createAdminByPost,
    adminsListByGet,
    deleteAdminByDelete,
    updateAdminByPut,
    getAdminProfileByGet,
    changeAdminPasswordByPut
};