const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createExam,getExam,deleteExam,updateExam} = require("../service/exam.service");
const db = knex(knexConfig);

const createExamByPost=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required' });
    }
    try {
        const admin_id = req.user.id;
        const exam_path = `uploads/exam/${req.file.filename}`;
        const { exam_name, course_id, doctor_name,description } = req.body;
        await createExam({ exam_name, course_id, doctor_name, exam_path, admin_id,description})
        return res.status(200).json({ success: true, message: 'Exam created successfully' });
    }catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const getExamByGet=async(req,res)=>{
    try {
        const filters=req.query;
        const result=await getExam(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No Exams found."
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

const deleteExamByDelete=async(req,res)=>{
    try {
        const admin_id = req.user.id;
        const examId=req.params.exam_id;
        const result=await deleteExam(examId,admin_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Exam not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Exam deleted successfully,You can find it in archive table",
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateExamByPut = async (req, res) => {

    const { exam_id } = req.params;
    const { exam_name, doctor_name,description } = req.body;

    const updateData = {};
    if (exam_name) updateData.exam_name = exam_name;
    if (doctor_name) updateData.doctor_name = doctor_name;
    if(description)updateData.description = description;
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ success: false, message: "No data to update." });
    }

    try {
        const result = await updateExam(exam_id, updateData);
        if (!result) {
            return res.status(404).json({ success: false, message: "Exam not updated." });
        }
        res.status(200).json({ success: true, message: "Exam updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

module.exports={
    createExamByPost,
    getExamByGet,
    deleteExamByDelete,
    updateExamByPut
}