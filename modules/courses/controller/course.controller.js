const{validationResult}=require('express-validator')
const {createCourse,coursesList,updateCourse,deleteCourse,getCourse}=require('../service/course.service')
const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);



const creteCourseByPost = async (req, res) => {
    try{
        const {course_name,course_note}=req.body;
        const result=await createCourse(course_name,course_note);
        return res.status(201).json({
            success:true,
            message:"Course created successfully",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const getCoursesByGet = async (req, res) => {
    try{
        const result=await coursesList();
        return res.status(200).json({
            success:true,
            result:result
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateCourseByPut = async (req, res) => {
    try{
        const id=req.params;
        const {course_name,course_note}=req.body;
        const data={};
        if(course_note) data.course_note=course_note;
        if(course_name) data.course_name=course_note;
        if(Objec.keys(data).length===0){
            return res.status(400).json({
                success:false,
                message:"No data to update."
            })
        }
        const result=await updateCourse(id,data);
        if(result===0){
            return res.status(404).json({
                success:false,
                message:"Course not found or no change."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteCourseByDelete = async (req, res) => {
    try {
        const {id} = req.params;
        const result=await deleteCourse(id);
        if(result===0){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }


}

const getCourseById = async (req, res) => {
    try{
        const {id} = req.params;
        const result=await getCourse(id);
        if(result===0){
            return res.status(404).json({
                success:false,
                message:"Course not found"
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
module.exports= {
    creteCourseByPost,
    getCoursesByGet,
    updateCourseByPut,
    deleteCourseByDelete,
    getCourseById
}