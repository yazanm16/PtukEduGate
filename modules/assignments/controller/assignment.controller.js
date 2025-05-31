const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createAssignment, getAssignment, deleteAssignment, updateAssignment} = require("../service/assignment.service");
const db = knex(knexConfig);

const createAssignmentByPost=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required' });
    }
    try {
        const admin_id = req.user.id;
        const assignment_path = `${req.protocol}://${req.get('host')}/uploads/assignment/${req.file.filename}`;
        const { assignment_name, course_id, doctor_name,description } = req.body;
        await createAssignment({ assignment_name, course_id, doctor_name, assignment_path, admin_id,description})
        return res.status(200).json({ success: true, message: 'Assignment created successfully' });
    }catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const getAssignmentByGet=async(req,res)=>{
    try {
        const filters=req.query;
        const result=await getAssignment(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No Assignment found."
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

const deleteAssignmentByDelete=async(req,res)=>{
    try {
        const assignmentId=req.params.assignment_id;
        const result=await deleteAssignment(assignmentId);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Assignment not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Assignment deleted successfully",
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateAssignmentByPut = async (req, res) => {

    const { assignment_id } = req.params;
    const { assignment_name, doctor_name } = req.body;

    const updateData = {};
    if (assignment_name) updateData.assignment_name = assignment_name;
    if (doctor_name) updateData.doctor_name = doctor_name;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ success: false, message: "No data to update." });
    }

    try {
        const result = await updateAssignment(assignment_id, updateData);
        if (!result) {
            return res.status(404).json({ success: false, message: "Assignment not updated." });
        }
        res.status(200).json({ success: true, message: "Assignment updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

module.exports={
    createAssignmentByPost,
    getAssignmentByGet,
    deleteAssignmentByDelete,
    updateAssignmentByPut
}
