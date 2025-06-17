const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createSlide, getSlide, deleteSlide, updateSlide} = require("../service/slide.service");

const createSlideByPost=async (req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required' });
    }
    try{
        const admin_id=req.user.id;
        const slide_path = `uploads/slide/${req.file.filename}`;
        const{slide_name,course_id,doctor_name,description}=req.body;
        await createSlide({slide_name, course_id, doctor_name, slide_path, admin_id, description});
        return res.status(200).json({success:true,message:"slide created successfully"});

    }catch (err){
    console.log(err);
    return res.status(500).json({success:false,message:"Something went wrong"});
    }
}

const getSlideByGet=async (req,res)=>{
    try{
        const filters=req.query;
        const result=await getSlide(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No slides found."
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

const deleteSlideByDelete=async (req,res)=>{
    try {
        const admin_id=req.user.id;
        const {slide_id}=req.params;
        const result=await deleteSlide(slide_id,admin_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"slide not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"slide deleted successfully,You can find it in archive table",
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateSlideByPut = async (req, res) => {
    try{
        const {slide_id}=req.params;
        const{slide_name,doctor_name,description}=req.body;
        const updateData={}
        if (slide_name)updateData.slide_name=slide_name;
        if(doctor_name)updateData.doctor_name=doctor_name;
        if(description)updateData.description=description;

        const result=await updateSlide(slide_id,updateData);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"slide not updated"
            })
        }
        return res.status(200).json({
            success:true,
            message:"slide updated successfully"
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
    createSlideByPost,
    getSlideByGet,
    deleteSlideByDelete,
    updateSlideByPut
}