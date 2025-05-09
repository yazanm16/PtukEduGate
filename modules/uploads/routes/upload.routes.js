const express = require('express');
const router = express.Router();
const{createUploadValidation, getUploadValidation, approveUploadValidation,getUploadsStudent}=require('../validation/upload.validation')
const{createUploadByPost,uploadListByGet, handleUploadApprovalByPut, getUploadByFiltersForStudent}=require('../controller/upload.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const upload = require("../middelware/upload.multer");
const checkUploadPermission = require("../middelware/checkUploadPermission.middleware");
const validate = require("../../main/middelware/handleValidation");





router.post('/student/upload',Authenticated,authorizeRoles('student'),upload.single('file'),createUploadValidation,validate,createUploadByPost)

router.get('/admin/uploads-filter',Authenticated,authorizeRoles('admin','superadmin'),getUploadValidation,validate,uploadListByGet)

router.put('/admin/approve-upload/:upload_id',Authenticated,authorizeRoles('admin','superadmin'),checkUploadPermission,approveUploadValidation,validate,handleUploadApprovalByPut)

router.get('/student/my-upload',Authenticated,authorizeRoles('student'),getUploadsStudent,validate,getUploadByFiltersForStudent)

module.exports=router;

