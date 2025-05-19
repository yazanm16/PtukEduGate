const express = require('express');
const router = express.Router();
const Authenticated=require('../../main/middelware/auth.middelware')
const authorizeRoles=require('../../main/middelware/authorizeRoles.middleware')
const validate = require("../../main/middelware/handleValidation");
const {createFavoriteByPost, deleteFavoriteByDelete, getFavoritesByGet} = require("../controller/favorite.controller");
const {createFavoriteValidation, deleteFavoriteValidation} = require("../validation/favorite.validation");


router.post('/favorite-create',Authenticated,authorizeRoles('student','admin','superadmin'),createFavoriteValidation,validate,createFavoriteByPost);

router.delete('/favorite-delete/:favorite_id',Authenticated,authorizeRoles('student','admin','superadmin'),deleteFavoriteValidation,validate,deleteFavoriteByDelete);

router.get('/favorite-list',Authenticated,authorizeRoles('student','admin','superadmin'),getFavoritesByGet);

module.exports = router;