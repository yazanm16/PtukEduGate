const{validationResult}=require('express-validator')
const{studentCreate,studentList,getStudentProfile,deleteStudent,updateStudent,StudentById}=require('../service/student.service')
const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const studentCreateByPost=async (req, res) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.json({errors: errors});

}
const {student_name,student_username,student_email,student_password}=req.body;
const result=await studentCreate(student_name,student_username,student_email,student_password);
return res.json(result);
}

const studentListByGet=async (req, res) => {
    try {
        const result=await studentList();
        res.status(200).json({
            success:true,
            data:result
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:"There was an error while getting student"
        });
    }

}

const getStudentProfileByGet=async (req, res) => {
    try{
        const studentId=req.user.id;
        const result=await getStudentProfile(studentId);
        if (!result){
            res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"There was an error while getting student"
        })
    }
}

const deleteStudentByDelete=async (req, res) => {
    try{
        const {id}=req.params;
        const result=await deleteStudent(id);
        if (!result){
            res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Student deleted successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"There was an error while deleting student"
        })
    }
}

const updateStudentByPut=async (req, res) => {
    try {
        const studentId=req.user.id;
        let {student_name,student_username,student_email,student_password}=req.body;
        const updateDate={}
        if(student_name){
            updateDate.student_name=student_name;
        }
        if(student_username){
            updateDate.student_username=student_username;
        }
        if(student_email){
            updateDate.student_email=student_email;
        }
        if(student_password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(student_password,salt);
            updateDate.student_password=hashedPassword;
        }
        if(Object.keys(updateDate).length===0){
            return res.status(404).json({
                success:false,
                message:"No Data Found"
            })
        }
        const result= await updateStudent(studentId,updateDate);
        if(!result){
            res.status(404).json({
                success:false,
                message:"Student not found or no changes made"
            })
        }
        res.status(200).json({
            success:true,
            message:"Successfully updated student"
        })
    }catch (e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:"There was an error while updating student"
        })
    }
}

const updatePasswordByPut=async (req, res) => {
    try {
        const studentId=req.user.id;
        const{student_password,new_password}=req.body;
        const student=await db('students').where({student_id:studentId}).first();
        if (!student){
            res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }
        const isMatch=await bcrypt.compare(student_password,student.student_password);
        if(!isMatch){
            return res.status(404).json({
                success:false,
                message:"Password not match"
            })
        }
        const hashedPassword=await bcrypt.hash(new_password,10);
        await db('students').where({student_id:studentId}).update({student_password:hashedPassword});
        return res.status(200).json({
            success:true,
            message:"Successfully updated Password"
        })

    }catch (e){
    console.log(e);
    res.status(500).json({
        success:false,
        message:"There was an error while updating Password student"
    })
    }
}

const getStudentByIdByGet=async (req, res) => {
    try{
        const {id} = req.params;
        const result=await StudentById(id)
        if (!result){
            res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"There was an error while getting student"
        })
    }
}

module.exports= {
    studentCreateByPost,
    studentListByGet,
    getStudentProfileByGet,
    deleteStudentByDelete,
    updateStudentByPut,
    updatePasswordByPut,
    getStudentByIdByGet
};