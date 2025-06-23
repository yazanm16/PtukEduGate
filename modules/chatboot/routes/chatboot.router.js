const express = require('express');
const router = express.Router();
const validate = require("../../main/middelware/handleValidation");
const {chatBootValidation} = require("../validation/chatboot.validation");
const {getChatResponse} = require("../controller/chatboot.controller");

router.post('/chatboot',chatBootValidation,validate,getChatResponse);

module.exports = router;