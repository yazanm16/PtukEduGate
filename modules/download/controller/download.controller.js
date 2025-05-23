const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const path = require('path');
const fs = require('fs');
const {downloadMaterial} = require("../service/download.service");

const downloadMaterialByGet=async (req,res)=>{
const {content_id,content_type}=req.params;
if(!content_id||!content_type)return res.status(400).send("Missing required information");
try{
    const fileData=await downloadMaterial(content_id,content_type);
    if(!fileData || !fileData.filePath)return res.status(404).send("File not found");

    const safeFilePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        'uploads',
        encodeURIComponent(content_type),
        path.basename(fileData.filePath)
    );
    if(!fs.existsSync(safeFilePath))return res.status(404).send("File not found");
    res.download(safeFilePath,fileData.fileName)
}catch (err){
    console.error('Download error:', err.message);
    return res.status(500).json({ message: 'Error downloading file.' });
}
}

module.exports={
    downloadMaterialByGet
}