const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createBookByPost, getBookByGet, deleteBookByDelete, updateBookByPut} = require("../controller/book.controller");
const {createBookValidation, getBooksValidation, deleteBookValidation, updateBookValidation} = require("../validation/book.validation");
const uploadBook=require('../middelware/book.multer')

router.post('/admin/book-create',Authenticated,authorizeRoles('superadmin'),uploadBook.single('file'),createBookValidation,validate,createBookByPost);

router.get('/book',getBooksValidation,validate,getBookByGet)

router.delete('/admin/book-delete/:book_id',Authenticated,authorizeRoles('superadmin'),deleteBookValidation,validate,deleteBookByDelete)

router.put('/admin/book-update/:book_id',Authenticated,authorizeRoles('superadmin'),updateBookValidation,validate,updateBookByPut)
module.exports = router;