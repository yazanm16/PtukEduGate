const express = require("express");
const {loginValidation, forgotPasswordValidation,resetPasswordValidation}=require("../validation/auth.validation");
const {loginByPost,forgotPasswordByPost, resetPasswordByPost} = require("../controller/auth.controller");
const router = express.Router();

router.post('/login',loginValidation ,loginByPost);
router.post('/forgot-password',forgotPasswordValidation,forgotPasswordByPost);
router.post('/reset-password',resetPasswordValidation,resetPasswordByPost);

module.exports = router;