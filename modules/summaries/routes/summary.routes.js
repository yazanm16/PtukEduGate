const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const uploadSummary = require("../middelware/summary.multer");
const {createSummaryValidation, getSummaryValidation, deleteSummaryValidation, updateSummaryValidation} = require("../validation/summary.validation");
const {createSummaryByPost, getSummaryByGet, deleteSummaryByDelete, updateSummaryByPut} = require("../controller/summary.controller");




router.post('/admin/summary-create',Authenticated,authorizeRoles('admin','superadmin'),uploadSummary.single('file'),createSummaryValidation,validate,createSummaryByPost);

router.get('/summary',getSummaryValidation,validate,getSummaryByGet)

router.delete('/admin/summary-delete/:summary_id',Authenticated,authorizeRoles('superadmin'),deleteSummaryValidation,validate,deleteSummaryByDelete)

router.put('/admin/summary-update/:summary_id',Authenticated,authorizeRoles('superadmin'),updateSummaryValidation,validate,updateSummaryByPut)

module.exports = router;