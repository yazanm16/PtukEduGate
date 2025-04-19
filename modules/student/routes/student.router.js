const express = require('express');
const router = express.Router();
const{createStudentValidation}=require('../validation/student.validation')
const {studentCreateByPost,studentListByGet}=require('../controller/student.controller')
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')


router.post('/signup',createStudentValidation,studentCreateByPost);
router.get('admin/all-student',Authenticated,authorizeRoles('admin'),studentListByGet);









module.exports = router;