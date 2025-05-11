const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {linkCourseToDepartment,listDepartmentsCourses,updateDC, deleteDC} = require("../service/dc.service");
const db = knex(knexConfig);

const linkCourseToDepartmentByPost=async (req,res)=>{
    const {course_id,departments_id,dc_type} = req.body;
    try {
        await linkCourseToDepartment(course_id, departments_id,dc_type);
        res.status(200).json({
            success: true,
            message: 'Course Linked To Department Successfully'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const getDepartmentsCoursesByGet = async (req, res) => {
    const filters = req.query;
    try {
       const result=await listDepartmentsCourses(filters);
       if (!result){
           res.status(404).json({
               success:false,
               message:"No Courses found."
           })
       }
       return res.status(200).json({
           success:true,
           data:result
       })
    }catch (err) {
    console.log(err);
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
    }
}

const updateDepartmentCourseByPut = async (req, res) => {
    try {
        const {dc_id}=req.params;
        const {course_id,departments_id,dc_type} = req.body;
        const data={};
        if(course_id) data.course_id=course_id;
        if(departments_id) data.departments_id=departments_id;
        if(dc_type) data.dc_type=dc_type;
        if(Object.keys(data).length===0){
            return res.status(400).json({
                success:false,
                message:"No data to update."
            })
        }
        const result=await updateDC(dc_id,data);
        if(result===0){
            return res.status(404).json({
                success:false,
                message:"Course not found or no change."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Record updated successfully",
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteDepartmentCourseByDelete = async (req, res) => {
    try{
        const {dc_id} = req.params;
        const result=await deleteDC(dc_id);
        if(result===0){
            return res.status(404).json({
                success:false,
                message:"Record not found"
            })
        }
        return res.status(200).json(
            {
                success:true,
                message:"Record deleted successfully",
            }
        )
    }catch (err){

    }
}
module.exports = {
    linkCourseToDepartmentByPost,
    getDepartmentsCoursesByGet,
    updateDepartmentCourseByPut,
    deleteDepartmentCourseByDelete
};