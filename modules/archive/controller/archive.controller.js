const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const {getArchive,restoreArchive,deleteArchive}=require('../service/archive.service');

const listArchivesByGet=async (req,res)=>{
    try{
        const filters=req.query;
        const result=await getArchive(filters);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"No Archive found."
            });
        }
      return   res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"Something went wrong."
    })
    }
}

const restoreArchiveByPost=async (req,res)=>{
    try{
        const {id} = req.params;
        const result=await restoreArchive(id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"No Archive found."
            })
        }
       return  res.status(200).json({
            success:true,
            data:result
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong."
        })
    }
}

const deleteArchiveByDelete=async (req,res)=>{
    try {
        const {id} = req.params;
        const result=await deleteArchive(id)
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Archive record not found."
            })
        }
        return res.status(200).json({
            success:true,
            message:"this item was deleted permanently."
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong."
        })
    }
}
module.exports = {
    listArchivesByGet,restoreArchiveByPost,deleteArchiveByDelete
}