const{validationResult}=require('express-validator')
const{studentCreate,studentList,getStudentProfile,deleteStudent}=require('../service/student.service')


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

const getStudentProfileByPost=async (req, res) => {
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


module.exports= {
    studentCreateByPost,
    studentListByGet,
    getStudentProfileByPost,
    deleteStudentByDelete
};