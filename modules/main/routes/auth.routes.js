const express = require("express");
const {loginValidation, forgotPasswordValidation,resetPasswordValidation}=require("../validation/auth.validation");
const {loginByPost,forgotPasswordByPost, resetPasswordByPost} = require("../controller/auth.controller");
const validate = require("../middelware/handleValidation");
const Authenticated = require("../middelware/auth.middelware");
const router = express.Router();

router.post('/login',loginValidation,validate ,loginByPost);
router.post('/forgot-password',forgotPasswordValidation,validate,forgotPasswordByPost);
router.post('/reset-password',resetPasswordValidation,validate,resetPasswordByPost);
router.post('/logout',Authenticated,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Logout successfully"
    })
})

module.exports = router;