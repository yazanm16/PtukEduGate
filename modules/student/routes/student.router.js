const express = require('express');
const router = express.Router();
const{createStudentValidation,deleteStudentValidation,updateStudentValidation,changePasswordValidation,studentByIdValidation}=require('../validation/student.validation')
const {studentCreateByPost,studentListByGet,getStudentProfileByGet,deleteStudentByDelete,updateStudentByPut,updatePasswordByPut,getStudentByIdByGet}=require('../controller/student.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')


router.post('/signup',createStudentValidation,studentCreateByPost);
router.get('/admin/all-student',Authenticated,authorizeRoles('admin'),studentListByGet);
router.get('/profile',Authenticated,authorizeRoles('student'),getStudentProfileByGet);
router.delete('/admin/delete-student/:id',Authenticated,authorizeRoles('admin'),deleteStudentValidation,deleteStudentByDelete);
router.put('/student/update',Authenticated,authorizeRoles('student'),updateStudentValidation,updateStudentByPut);
router.put('/student/change-password',Authenticated,authorizeRoles('student'),changePasswordValidation,updatePasswordByPut);
router.get('/admin/student/:id',Authenticated,authorizeRoles('admin'),studentByIdValidation,getStudentByIdByGet);






module.exports = router;