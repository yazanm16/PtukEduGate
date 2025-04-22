const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const {creteCourseByPost} = require("../controller/course.controller");
const {createCourseValidation} = require("../validation/course.validation");






router.post('/admin/courses/create',Authenticated,authorizeRoles('admin','superadmin'),createCourseValidation,creteCourseByPost);





module.exports = router;