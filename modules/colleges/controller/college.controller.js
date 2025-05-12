const {createCollege, deleteCollege, listCollege}=require('../service/college.service')
const knex = require('knex');
const knexConfig = require('../../../knexfile');


const createCollegeByPost=async(req,res)=>{
    try {
        const {college_name}=req.body;
        const result=createCollege(college_name);
        return res.status(201).json({
            success:true,
            message:"college created successfully",
        });
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteCollegeByDelete=async(req,res)=>{
    const {college_id}=req.params;
    try {
        const result=await deleteCollege(college_id);
        if(result===0){
            return res.status(404).json({
                success:false,
                message:"college not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"college deleted successfully",
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const getCollegesByGet=async(req,res)=>{
    try {
        const filters=req.query;
        const result=await listCollege(filters)
        if (!result){
            res.status(404).json({
                success:false,
                message:"No colleges found."
            })
        }
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }

}
module.exports={
    createCollegeByPost,
    deleteCollegeByDelete,
    getCollegesByGet
}