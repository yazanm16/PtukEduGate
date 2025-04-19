const express = require("express");
const loginByPost=require("../controller/auth.controller");
const {loginValidation}=require("../validation/auth.validation");
const router = express.Router();
router.post('/login',loginValidation ,loginByPost);


module.exports = router;