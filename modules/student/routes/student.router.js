const express = require('express');
const router = express.Router();
const{createStudentValidation,deleteStudentValidation,updateStudentValidation,changePasswordValidation,getStudentsValidation}=require('../validation/student.validation')
const {studentCreateByPost,studentListByGet,getStudentProfileByGet,deleteStudentByDelete,updateStudentByPut,updatePasswordByPut}=require('../controller/student.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')


router.post('/signup',createStudentValidation,studentCreateByPost);
router.get('/admin/all-student-filters',Authenticated,authorizeRoles('superadmin'),getStudentsValidation,studentListByGet);
router.get('/profile',Authenticated,authorizeRoles('student'),getStudentProfileByGet);
router.delete('/admin/delete-student/:id',Authenticated,authorizeRoles('superadmin'),deleteStudentValidation,deleteStudentByDelete);
router.put('/student/update-profile',Authenticated,authorizeRoles('student'),updateStudentValidation,updateStudentByPut);
router.put('/student/change-password',Authenticated,authorizeRoles('student'),changePasswordValidation,updatePasswordByPut);





module.exports = router;