const express = require('express');
const router = express.Router();
const validate = require("../../main/middelware/handleValidation");
const {downloadMaterialValidation} = require("../validation/download.validation");
const {downloadMaterialByGet} = require("../controller/download.controller");

router.get('/download/:content_type/:content_id',downloadMaterialValidation,validate,downloadMaterialByGet);

module.exports = router;