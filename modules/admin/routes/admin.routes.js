const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const{createAdminValidation,deleteAdminValidation,updateAdminValidation,getAdminsValidation}=require('../validation/admin.validation');
const{createAdminByPost, adminsListByGet,deleteAdminByDelete, updateAdminByPut}=require('../controller/admin.controller');



router.post('/admins/create-from-student',Authenticated,authorizeRoles('superadmin'),createAdminValidation,createAdminByPost)

router.get('/admins-list-filters',Authenticated,authorizeRoles('superadmin'),getAdminsValidation,adminsListByGet)

router.delete('/admins-delete/:id',Authenticated,authorizeRoles('superadmin'),deleteAdminValidation,deleteAdminByDelete)

router.put('/admin/update-profile',Authenticated,authorizeRoles('superadmin'),updateAdminValidation,updateAdminByPut)
module.exports = router;