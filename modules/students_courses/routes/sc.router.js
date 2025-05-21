const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createStudentCourseByPost, getStudentCoursesByGet, deleteStudentCourseByDelete} = require("../controller/sc.controller");
const {createStudentCourseValidation, deleteStudentCourseValidation} = require("../validation/sc.validation");


router.post('/student-course-create',Authenticated,authorizeRoles('student','admin','superadmin'),createStudentCourseValidation,validate,createStudentCourseByPost);

router.get('/student-course-list',Authenticated,authorizeRoles('student','admin','superadmin'),getStudentCoursesByGet);

router.delete('/student-course-delete/:SC_id',Authenticated,authorizeRoles('student','admin','superadmin'),deleteStudentCourseValidation,validate,deleteStudentCourseByDelete);

module.exports = router;