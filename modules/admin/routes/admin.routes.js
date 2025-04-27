const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const{createAdminValidation}=require('../validation/admin.validation');
const{createAdminByPost}=require('../controller/admin.controller');
router.post('/admins/create-from-student',Authenticated,authorizeRoles('superadmin'),createAdminValidation,createAdminByPost)


module.exports = router;