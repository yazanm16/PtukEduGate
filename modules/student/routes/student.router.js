const express = require('express');
const router = express.Router();
const{createStudentValidation,deleteStudentValidation}=require('../validation/student.validation')
const {studentCreateByPost,studentListByGet,getStudentProfileByPost,deleteStudentByDelete}=require('../controller/student.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')


router.post('/signup',createStudentValidation,studentCreateByPost);
router.get('/admin/all-student',Authenticated,authorizeRoles('admin'),studentListByGet);
router.get('/profile',Authenticated,authorizeRoles('student'),getStudentProfileByPost);
router.delete('/admin/delete-student/:id',Authenticated,authorizeRoles('student'),deleteStudentValidation,deleteStudentByDelete);









module.exports = router;