const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const content_id = body('content_id').isInt().withMessage('Content ID must be an integer')
    .bail()
    .custom(async (val, { req }) => {
        const type = req.body.content_type;
        const tableMap = {
            book: 'books',
            exam: 'exams',
            slide: 'slides',
            summary: 'summaries',
            video: 'videos'
        };
        const table = tableMap[type];
        if (!table) throw new Error('Invalid content type');
        const item = await db(table).where(`${type}_id`, val).first();
        if (!item) throw new Error('Content not found');
        return true;
    });

const content_type = body('content_type').isIn(['book', 'exam', 'slide', 'summary', 'video'])
    .withMessage('Invalid content type');

const favorite_id = param('favorite_id').isInt().withMessage('Favorite ID must be an integer')
    .bail()
    .custom(async (value) => {
        try {
            const f_id=await db('favorites').where('id',value).first();
            if(f_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("favorite id not found.");
            }
        }catch (err) {
            return Promise.reject("favorite id not found.");
        }
    });

const createFavoriteValidation = [content_id, content_type];
const deleteFavoriteValidation = [favorite_id];

module.exports = {
    createFavoriteValidation,
    deleteFavoriteValidation
};
