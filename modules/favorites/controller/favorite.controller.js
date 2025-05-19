const { validationResult } = require('express-validator');
const { addFavorite, removeFavorite, listFavorites } = require('../service/favorite,service');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const createFavoriteByPost = async (req, res) => {
    try {
        let student_id = req.user.id;

        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({ admin_id: req.user.id }).first();
            student_id = admin.student_id;
        }

        const { content_id, content_type } = req.body;
        const exists = await db('favorites')
            .where({ student_id, content_id, content_type })
            .first();

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'This item is already in favorites'
            });
        }
        const result = await addFavorite({ student_id, content_id, content_type });

        return res.status(201).json({ success: true, message: 'Favorite added', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

const deleteFavoriteByDelete = async (req, res) => {
    try {
        let student_id = req.user.id;
        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({ admin_id: req.user.id }).first();
            student_id = admin.student_id;
        }

        const { favorite_id } = req.params;
        const result = await removeFavorite(favorite_id,student_id);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Favorite not found' });
        }

        return res.status(200).json({ success: true, message: 'Favorite removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

const getFavoritesByGet = async (req, res) => {
    try {
        let student_id = req.user.id;
        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            const admin = await db('admins').where({ admin_id: req.user.id }).first();
            student_id = admin.student_id;
        }

        const result = await listFavorites(student_id);
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

module.exports = {
    createFavoriteByPost,
    deleteFavoriteByDelete,
    getFavoritesByGet
};
