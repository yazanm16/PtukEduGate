const express = require("express");
const {loginValidation, forgotPasswordValidation,resetPasswordValidation}=require("../validation/auth.validation");
const {loginByPost,forgotPasswordByPost, resetPasswordByPost} = require("../controller/auth.controller");
const validate = require("../middelware/handleValidation");
const router = express.Router();

router.post('/login',loginValidation,validate ,loginByPost);
router.post('/forgot-password',forgotPasswordValidation,validate,forgotPasswordByPost);
router.post('/reset-password',resetPasswordValidation,validate,resetPasswordByPost);

module.exports = router;