const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles = require("../../main/middelware/authorizeRoles.middleware");
const {linkDepartmentWithCourseValidation, getDepartmentCoursesValidation,updateDepartmentCourseValidation, deleteDepartmentCourseValidation} = require("../validation/dc.validation");
const validate = require("../../main/middelware/handleValidation");
const {linkCourseToDepartmentByPost, getDepartmentsCoursesByGet, updateDepartmentCourseByPut, deleteDepartmentCourseByDelete} = require("../controller/dc.controller");




router.post('/admin/link-course',Authenticated,authorizeRoles('superadmin'),linkDepartmentWithCourseValidation,validate,linkCourseToDepartmentByPost)

router.get('/list-courses-departments',getDepartmentCoursesValidation,validate,getDepartmentsCoursesByGet)

router.put('/admin/updateDc/:dc_id',Authenticated,authorizeRoles('superadmin'),updateDepartmentCourseValidation,validate,updateDepartmentCourseByPut)

router.delete('/admin/deleteDC/:dc_id',Authenticated,authorizeRoles('superadmin'),deleteDepartmentCourseValidation,validate,deleteDepartmentCourseByDelete)

module.exports = router;