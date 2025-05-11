const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles = require("../../main/middelware/authorizeRoles.middleware");
const {linkDepartmentWithCourseValidation, getDepartmentCoursesValidation} = require("../validation/dc.validation");
const validate = require("../../main/middelware/handleValidation");
const {linkCourseToDepartmentByPost, getDepartmentsCoursesByGet} = require("../controller/dc.controller");




router.post('/admin/link-course',Authenticated,authorizeRoles('superadmin'),linkDepartmentWithCourseValidation,validate,linkCourseToDepartmentByPost)

router.get('/list-courses-departments',Authenticated,getDepartmentCoursesValidation,validate,getDepartmentsCoursesByGet)
module.exports = router;