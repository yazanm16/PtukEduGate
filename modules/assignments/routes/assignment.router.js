const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const uploadAssignment=require('../middelware/assignment.multer')
const {createAssignmentValidation, getAssignmentValidation, deleteAssignmentValidation, updateAssignmentValidation} = require("../validation/assignment.validation");
const {createAssignmentByPost, getAssignmentByGet, deleteAssignmentByDelete, updateAssignmentByPut} = require("../controller/assignment.controller");

router.post('/admin/assignment-create',Authenticated,authorizeRoles('superadmin'),uploadAssignment.single('file'),createAssignmentValidation,validate,createAssignmentByPost);

router.get('/assignment',getAssignmentValidation,validate,getAssignmentByGet)

router.delete('/admin/assignment-delete/:assignment_id',Authenticated,authorizeRoles('superadmin'),deleteAssignmentValidation,validate,deleteAssignmentByDelete)

router.put('/admin/assignment-update/:assignment_id',Authenticated,authorizeRoles('superadmin'),updateAssignmentValidation,validate,updateAssignmentByPut)

module.exports = router;