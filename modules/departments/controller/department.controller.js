const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createDepartment,DepartmentList,updateDepartment,deleteDepartment} = require("../service/department.service");
const db = knex(knexConfig);

const createDepartmentByPost = async (req, res) => {
    try {
        const{departments_name,college_id}=req.body;
        const result=await createDepartment({departments_name, college_id});
        return res.status(200).json({
            success:true,
            message:"Successfully created department"
        })
    }catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

const getDepartmentsByGet = async (req, res) => {
    try{
        const filters=req.query;
        const result=await DepartmentList(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No Departments found."
            })
        }
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateDepartmentByPut = async (req, res) => {
    try{
        const {departments_id} = req.params;
        const{departments_name,college_id}=req.body;
        const data={}
        if(departments_name)data.departments_name=departments_name;
        if(college_id)data.college_id=college_id;
        if(Object.keys(data).length===0){
            res.status(404).json({
                success:false,
                message:"No Data To Update."
            })
        }

        const result=await updateDepartment(departments_id,data);
        if (result===0){
            res.status(404).json({
                success:false,
                message:"Department not found or no change."

            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully updated department"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteDepartmentByDelete = async (req, res) => {
    try{
        const {departments_id} = req.params;
        const result=await deleteDepartment(departments_id);
        if(result===0){
            res.status(404).json({
                success:false,
                message:"Department not found."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully deleted department"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports = {
    createDepartmentByPost,
    getDepartmentsByGet,
    updateDepartmentByPut,
    deleteDepartmentByDelete
};