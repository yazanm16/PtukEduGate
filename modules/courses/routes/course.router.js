const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const {creteCourseByPost,getCoursesByGet,updateCourseByPut,deleteCourseByDelete} = require("../controller/course.controller");
const {createCourseValidation,updateCourseValidation,deleteCourseValidation,getCoursesValidation} = require("../validation/course.validation");
const validate = require("../../main/middelware/handleValidation");






router.post('/admin/courses/create',Authenticated,authorizeRoles('admin','superadmin'),createCourseValidation,validate,creteCourseByPost);
router.get('/courses-filters',getCoursesValidation,getCoursesByGet);
router.put('/admin/course/update/:course_id',Authenticated,authorizeRoles('admin','superadmin'),updateCourseValidation,validate,updateCourseByPut);
router.delete('/admin/course/delete/:course_id',Authenticated,authorizeRoles('admin','superadmin'),deleteCourseValidation,validate,deleteCourseByDelete);




module.exports = router;