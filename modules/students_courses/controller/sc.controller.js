const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createStudentCourse,deleteStudentCourse,getStudentCourses} = require("../service/sc.service");
const db = knex(knexConfig);

const createStudentCourseByPost=async (req,res)=>{
   try {
       let student_id = req.user.id;

       if (req.user.role === 'admin' || req.user.role === 'superadmin') {
           const admin = await db('admins').where({ admin_id: req.user.id }).first();
           student_id = admin.student_id;
       }
       const {course_id}=req.body;
       const exists=await db('students_courses').where({student_id,course_id}).first();
       if(exists){
           return res.status(400).json({
               success:false,
               message:'This item is already in the Semester table '
           })
       }
       const result=await createStudentCourse(student_id,course_id)
       return res.status(201).json({
           success:true,
           message:"Student Course added successfully",
           data:result
       })

   }catch (err){
       console.log(err);
       res.status(500).json({
           success:false,
           message:"Something went wrong"
       })
   }
}

const deleteStudentCourseByDelete=async (req,res)=>{
    try{
        let student_id = req.user.id;

        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({ admin_id: req.user.id }).first();
            student_id = admin.student_id;
        }
        const{SC_id}=req.params;
        const result=await deleteStudentCourse(SC_id,student_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Student Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Student Course deleted successfully",
        })

    }catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const getStudentCoursesByGet=async (req,res)=>{
    try {
        let student_id = req.user.id;

        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({ admin_id: req.user.id }).first();
            student_id = admin.student_id;
        }
        const result=await getStudentCourses(student_id);
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
module.exports= {
    createStudentCourseByPost,
    deleteStudentCourseByDelete,
    getStudentCoursesByGet

};