const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createExamByPost, getExamByGet, deleteExamByDelete,updateExamByPut} = require("../controller/exam.controller");
const {createExamValidation, getExamValidation, deleteExamValidation, updateExamValidation} = require("../validation/exam.validation");
const uploadExam=require('../middelware/exam.multer')

router.post('/admin/exam-create',Authenticated,authorizeRoles('superadmin'),uploadExam.single('file'),createExamValidation,validate,createExamByPost);

router.get('/exam',getExamValidation,validate,getExamByGet)

router.delete('/admin/exam-delete/:exam_id',Authenticated,authorizeRoles('superadmin'),deleteExamValidation,validate,deleteExamByDelete)

router.put('/admin/exam-update/:exam_id',Authenticated,authorizeRoles('superadmin'),updateExamValidation,validate,updateExamByPut)

module.exports = router;