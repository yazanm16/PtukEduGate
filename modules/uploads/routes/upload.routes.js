const express = require('express');
const router = express.Router();
const{createUploadValidation, getUploadValidation, approveUploadValidation}=require('../validation/upload.validation')
const{createUploadByPost,uploadListByGet, handleUploadApprovalByPut}=require('../controller/upload.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const upload = require("../middelware/upload.multer");
const checkUploadPermission = require("../middelware/checkUploadPermission.middleware");





router.post('/student/upload',Authenticated,authorizeRoles('student'),upload.single('file'),createUploadValidation,createUploadByPost)

router.get('/admin/uploads-filter',Authenticated,authorizeRoles('admin','superadmin'),getUploadValidation,uploadListByGet)

router.put('/admin/approve-upload/:upload_id',Authenticated,authorizeRoles('admin','superadmin'),checkUploadPermission,approveUploadValidation,handleUploadApprovalByPut)

module.exports=router;

