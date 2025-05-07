const express = require('express');
const router = express.Router();
const{createUploadValidation, getUploadValidation}=require('../validation/upload.validation')
const{createUploadByPost,uploadListByGet}=require('../controller/upload.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const upload = require("../middelware/upload.multer");





router.post('/student/upload',Authenticated,authorizeRoles('student'),upload.single('file'),createUploadValidation,createUploadByPost)

router.get('/admin/uploads-filter',Authenticated,authorizeRoles('admin','superadmin'),getUploadValidation,uploadListByGet)
module.exports=router;

