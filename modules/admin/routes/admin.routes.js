const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const{createAdminValidation,deleteAdminValidation,updateAdminValidation,getAdminsValidation, changeAdminPasswordValidation,
    updateAdminDepartmentValidation,
    updateAdminRoleValidation
}=require('../validation/admin.validation');
const{createAdminByPost, adminsListByGet,deleteAdminByDelete, updateAdminByPut, getAdminProfileByGet, changeAdminPasswordByPut,
    updateDepartmentsAdminByPut,
    updateRolesAdminByPut
}=require('../controller/admin.controller');
const validate = require("../../main/middelware/handleValidation");



router.post('/admins/create-from-student',Authenticated,authorizeRoles('superadmin'),createAdminValidation,validate,createAdminByPost)

router.get('/admins-list-filters',Authenticated,authorizeRoles('superadmin'),getAdminsValidation,validate,adminsListByGet)

router.delete('/admins-delete/:admin_id',Authenticated,authorizeRoles('superadmin'),deleteAdminValidation,validate,deleteAdminByDelete)

router.put('/admin/update-profile',Authenticated,authorizeRoles('admin','superadmin'),updateAdminValidation,validate,updateAdminByPut)

router.get('/admin-profile',Authenticated,authorizeRoles('admin','superadmin'),getAdminProfileByGet)

router.put('/admin/change-password',Authenticated,authorizeRoles('admin','superadmin'),changeAdminPasswordValidation,validate,changeAdminPasswordByPut)

router.put('/admin/change-department/:department_id',Authenticated,authorizeRoles('superadimn'),updateAdminDepartmentValidation,validate,updateDepartmentsAdminByPut)

router.put('/admin/change-role/:admin_id',Authenticated,authorizeRoles('superadmin'),updateAdminRoleValidation,validate,updateRolesAdminByPut)

module.exports = router;