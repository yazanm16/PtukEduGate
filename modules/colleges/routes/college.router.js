const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createCollegeByPost, deleteCollegeByDelete, getCollegesByGet, updateCollegeByPut} = require("../controller/college.controller");
const {createCollegeValidation, deleteCollegeValidation, getCollegesValidation, updateCollegeValidation} = require("../validation/college.validation");


router.post('/admin/college-create',Authenticated,authorizeRoles('superadmin'),createCollegeValidation,validate,createCollegeByPost);
router.delete('/admin/college-delete/:college_id',Authenticated,authorizeRoles('superadmin'),deleteCollegeValidation,validate,deleteCollegeByDelete);
router.get('/List-colleges',getCollegesValidation,validate,getCollegesByGet)
router.put('/admin/update-college/:college_id',updateCollegeValidation,validate,updateCollegeByPut)
module.exports = router;