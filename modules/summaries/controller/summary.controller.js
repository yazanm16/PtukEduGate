const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createSummary, getSummary, deleteSummary, updateSummary} = require("../service/summary.service");

const createSummaryByPost=async (req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required' });
    }
    try{
        const admin_id=req.user.id;
        const summary_path = `uploads/summary/${req.file.filename}`;
        const{summary_name,course_id,doctor_name,description}=req.body;
        await createSummary({summary_name, course_id, doctor_name, summary_path, admin_id,description});
        return res.status(200).json({success:true,message:"summary created successfully"});

    }catch (err){
    console.log(err);
    return res.status(500).json({success:false,message:"Something went wrong"});
    }
}

const getSummaryByGet=async (req,res)=>{
    try{
        const filters=req.query;
        const result=await getSummary(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No Summary found."
            })
        }
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch (err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteSummaryByDelete=async (req,res)=>{
    try {
        const admin_id=req.user.id;
        const {summary_id}=req.params;
        const result=await deleteSummary(summary_id,admin_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Summary not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Summary deleted successfully,You can find it in archive table",
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateSummaryByPut = async (req, res) => {
    try{
        const {summary_id}=req.params;
        const{summary_name,doctor_name,description}=req.body;
        const updateData={}
        if (summary_name)updateData.slide_name=summary_name;
        if(doctor_name)updateData.doctor_name=doctor_name;
        if(description)updateData.description=description;

        const result=await updateSummary(summary_id,updateData);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Summary not updated"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Summary updated successfully"
        })

    }catch (err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
module.exports={
    createSummaryByPost,
    getSummaryByGet,
    deleteSummaryByDelete,
    updateSummaryByPut
}
