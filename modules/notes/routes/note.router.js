const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createNoteByPost, deleteNoteByDelete, listNotesByGet, updateNoteByPut} = require("../controller/note.controller");
const {createNoteValidation, deleteNoteValidation, updateNoteValidation} = require("../validation/note.validation");


router.post('/note-create',Authenticated,authorizeRoles('student','admin','superadmin'),createNoteValidation,validate,createNoteByPost);

router.delete('/note-delete/:note_id',Authenticated,authorizeRoles('student','admin','superadmin'),deleteNoteValidation,validate,deleteNoteByDelete);

router.get('/note-list',Authenticated,authorizeRoles('student','admin','superadmin'),listNotesByGet)

router.put('/note-update/:note_id',Authenticated,authorizeRoles('student','admin','superadmin'),updateNoteValidation,validate,updateNoteByPut)


module.exports = router;