const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const{createAdminValidation,deleteAdminValidation,updateAdminValidation,getAdminsValidation, changeAdminPasswordValidation}=require('../validation/admin.validation');
const{createAdminByPost, adminsListByGet,deleteAdminByDelete, updateAdminByPut, getAdminProfileByGet, changeAdminPasswordByPut}=require('../controller/admin.controller');
const validate = require("../../main/middelware/handleValidation");



router.post('/admins/create-from-student',Authenticated,authorizeRoles('superadmin'),createAdminValidation,validate,createAdminByPost)

router.get('/admins-list-filters',Authenticated,authorizeRoles('superadmin'),getAdminsValidation,validate,adminsListByGet)

router.delete('/admins-delete/:admin_id',Authenticated,authorizeRoles('superadmin'),deleteAdminValidation,validate,deleteAdminByDelete)

router.put('/admin/update-profile',Authenticated,authorizeRoles('admin','superadmin'),updateAdminValidation,validate,updateAdminByPut)

router.get('admin-profile',Authenticated,authorizeRoles('admin','superadmin'),getAdminProfileByGet)

router.put('admin/change-password',Authenticated,authorizeRoles('admin','superadmin'),changeAdminPasswordValidation,validate,changeAdminPasswordByPut)


module.exports = router;