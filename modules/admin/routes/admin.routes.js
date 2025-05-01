const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const{createAdminValidation,deleteAdminValidation}=require('../validation/admin.validation');
const{createAdminByPost, adminsListByGet,deleteAdminByDelete}=require('../controller/admin.controller');



router.post('/admins/create-from-student',Authenticated,authorizeRoles('superadmin'),createAdminValidation,createAdminByPost)

router.get('/admins-list',Authenticated,authorizeRoles('superadmin'),adminsListByGet)

router.delete('/admins-delete/:id',Authenticated,authorizeRoles('superadmin'),deleteAdminValidation,deleteAdminByDelete)

module.exports = router;