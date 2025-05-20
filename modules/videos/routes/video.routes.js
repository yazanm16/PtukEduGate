const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const uploadVideo = require("../middelware/video.multer");
const {createVideoValidation, getVideoValidation, deleteVideoValidation, updateVideoValidation} = require("../validation/video.validation");
const {createVideoByPost, getVideoByGet, deleteVideoByDelete, updateVideoByPut} = require("../controller/video.controller");




router.post('/admin/video-create',Authenticated,authorizeRoles('superadmin'),uploadVideo.single('file'),createVideoValidation,validate,createVideoByPost);

router.get('/video',getVideoValidation,validate,getVideoByGet)

router.delete('/admin/video-delete/:video_id',Authenticated,authorizeRoles('superadmin'),deleteVideoValidation,validate,deleteVideoByDelete)

router.put('/admin/video-update/:video_id',Authenticated,authorizeRoles('superadmin'),updateVideoValidation,validate,updateVideoByPut)

module.exports = router;