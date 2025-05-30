const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {sendContactMessageValidation} = require("../validation/contact.validation");
const {sendMessageByPost, listMessagesByGet} = require("../controller/contact.controller");

router.post('/contact',sendContactMessageValidation,validate,sendMessageByPost)

router.get('/admin/contact',Authenticated,authorizeRoles('superadmin'),listMessagesByGet)

module.exports = router;