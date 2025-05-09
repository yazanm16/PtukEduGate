const express = require('express');
const router = express.Router();
const{createStudentValidation,deleteStudentValidation,updateStudentValidation,changePasswordValidation,getStudentsValidation}=require('../validation/student.validation')
const {studentCreateByPost,studentListByGet,getStudentProfileByGet,deleteStudentByDelete,updateStudentByPut,updatePasswordByPut}=require('../controller/student.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");


router.post('/signup',createStudentValidation,validate,studentCreateByPost);
router.get('/admin/all-student-filters',Authenticated,authorizeRoles('superadmin'),getStudentsValidation,validate,studentListByGet);
router.get('/profile',Authenticated,authorizeRoles('student'),getStudentProfileByGet);
router.delete('/admin/delete-student/:id',Authenticated,authorizeRoles('superadmin'),deleteStudentValidation,validate,deleteStudentByDelete);
router.put('/student/update-profile',Authenticated,authorizeRoles('student'),updateStudentValidation,validate,updateStudentByPut);
router.put('/student/change-password',Authenticated,authorizeRoles('student'),changePasswordValidation,validate,updatePasswordByPut);





module.exports = router;