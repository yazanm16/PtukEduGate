const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const {creteCourseByPost,getCoursesByGet,updateCourseByPut,deleteCourseByDelete} = require("../controller/course.controller");
const {createCourseValidation,updateCourseValidation,deleteCourseValidation,getCoursesValidation} = require("../validation/course.validation");






router.post('/admin/courses/create',Authenticated,authorizeRoles('admin','superadmin'),createCourseValidation,creteCourseByPost);
router.get('/courses-filters',getCoursesValidation,getCoursesByGet);
router.put('/admin/course/update/:id',Authenticated,authorizeRoles('admin','superadmin'),updateCourseValidation,updateCourseByPut);
router.delete('admin/course/delete/:id',Authenticated,authorizeRoles('admin','superadmin'),deleteCourseValidation,deleteCourseByDelete);




module.exports = router;