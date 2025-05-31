const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createDepartmentValidation, getDepartmentsValidation, updateDepartmentValidation,deleteDepartmentValidation} = require("../validation/department.validation");
const {createDepartmentByPost, getDepartmentsByGet, updateDepartmentByPut, deleteDepartmentByDelete} = require("../controller/department.controller");



router.post('/admin/department-create',Authenticated,authorizeRoles('superadmin'),createDepartmentValidation,validate,createDepartmentByPost)

router.get('/department-list',getDepartmentsValidation,validate,getDepartmentsByGet)

router.put('/admin/department-update/:departments_id',Authenticated,authorizeRoles('superadmin'),updateDepartmentValidation,validate,updateDepartmentByPut)

router.delete('/admin/department-delete/:departments_id',Authenticated,authorizeRoles('superadmin'),deleteDepartmentValidation,validate,deleteDepartmentByDelete)

module.exports = router;