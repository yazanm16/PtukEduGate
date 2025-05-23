const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const content_id = param('content_id').isInt().withMessage('Content ID must be an integer')
    .custom(async (val, { req }) => {
        const type = req.params.content_type;
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

const content_type = param('content_type').isIn(['book', 'exam', 'slide', 'summary', 'video'])
    .withMessage('Invalid content type');

const downloadMaterialValidation = [content_id, content_type];
module.exports = {
    downloadMaterialValidation
};