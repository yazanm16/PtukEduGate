const{validationResult}=require('express-validator')
const{studentCreate,studentList}=require('../service/student.service')


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



module.exports= {
    studentCreateByPost,
    studentListByGet
};