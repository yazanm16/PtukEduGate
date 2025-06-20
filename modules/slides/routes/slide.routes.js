const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const uploadSlide = require("../middelware/slide.multer");
const {createSlideValidation,getSlidesValidation, deleteSlideValidation, updateSlideValidation} = require("../validation/slide.validation");
const {createSlideByPost, getSlideByGet, deleteSlideByDelete, updateSlideByPut} = require("../controller/slide.controller");



router.post('/admin/slide-create',Authenticated,authorizeRoles('admin','superadmin'),uploadSlide.single('file'),createSlideValidation,validate,createSlideByPost);

router.get('/slide',getSlidesValidation,validate,getSlideByGet)

router.delete('/admin/slide-delete/:slide_id',Authenticated,authorizeRoles('superadmin'),deleteSlideValidation,validate,deleteSlideByDelete)

router.put('/admin/slide-update/:slide_id',Authenticated,authorizeRoles('superadmin'),updateSlideValidation,validate,updateSlideByPut)

module.exports = router;