const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {getArchiveValidation, restoreArchiveValidation,deleteArchiveValidation} = require("../validation/archive.validation");
const {listArchivesByGet, restoreArchiveByPost, deleteArchiveByDelete} = require("../controller/archive.controller");

router.get('/admin/list-archive',Authenticated,authorizeRoles('superadmin'),getArchiveValidation,validate,listArchivesByGet)

router.post('/admin/restore-archive/:id',Authenticated,authorizeRoles('superadmin'),restoreArchiveValidation,validate,restoreArchiveByPost)

router.delete('/admin/delete-archive/:id',Authenticated,authorizeRoles('superadmin'),deleteArchiveValidation,validate,deleteArchiveByDelete)
module.exports = router;