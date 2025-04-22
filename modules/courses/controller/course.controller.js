const{validationResult}=require('express-validator')
const {createCourse}=require('../service/course.service')
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
module.exports={
    creteCourseByPost
}