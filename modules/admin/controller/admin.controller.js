const{validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const{createAdmin}=require('../service/admin.service')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createAdminByPost=async(req,res)=>{
    try{
        const {student_id,department_id,role}=req.body;
        const result=await createAdmin(student_id,department_id,role);
        res.status(201).json({
            status:"success",
            result:result
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
}
module.exports = {
    createAdminByPost
};