const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createVideo, getVideo, deleteVideo, updateVideo} = require("../service/video.service");

const createVideoByPost=async (req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required' });
    }
    try{
        const admin_id=req.user.id;
        const video_path = `${req.protocol}://${req.get('host')}/uploads/video/${req.file.filename}`;
        const{video_name,course_id,doctor_name,description}=req.body;
        await createVideo({video_name, course_id, doctor_name, video_path, admin_id,description});
        return res.status(200).json({success:true,message:"Video created successfully"});

    }catch (err){
    console.log(err);
    return res.status(500).json({success:false,message:"Something went wrong"});
    }
}

const getVideoByGet=async (req,res)=>{
    try{
        const filters=req.query;
        const result=await getVideo(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No Video found."
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

const deleteVideoByDelete=async (req,res)=>{
    try {
        const {video_id}=req.params;
        const result=await deleteVideo(video_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Video not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Video deleted successfully",
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateVideoByPut = async (req, res) => {
    try{
        const {video_id}=req.params;
        const{video_name,doctor_name}=req.body;
        const updateData={}
        if (video_name)updateData.slide_name=video_name;
        if(doctor_name)updateData.doctor_name=doctor_name;

        const result=await updateVideo(video_id,updateData);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Video not updated"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Video updated successfully"
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
    createVideoByPost,
    getVideoByGet,
    deleteVideoByDelete,
    updateVideoByPut
}

