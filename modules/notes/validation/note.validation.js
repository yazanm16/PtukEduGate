const { body, param, query} = require('express-validator');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const content_type = body('content_type')
    .notEmpty().withMessage('Content type is required')
    .bail()
    .isIn(['book', 'exam', 'slide', 'summary', 'video','assignment']).withMessage('Invalid content type');

const content_id = body('content_id').isInt().withMessage('Content ID must be an integer')
    .bail()
    .custom(async (val, { req }) => {
        const type = req.body.content_type;
        const tableMap = {
            book: 'books',
            exam: 'exams',
            slide: 'slides',
            summary: 'summaries',
            video: 'videos',
            assignment:'assignments'
        };
        const table = tableMap[type];
        if (!table) throw new Error('Invalid content type');
        const item = await db(table).where(`${type}_id`, val).first();
        if (!item) throw new Error('Content not found');
        return true;
    });

const note_text = body('note_text')
    .optional()
    .isString().withMessage('Note text must be a string');

const note_id = param('note_id').isInt().withMessage('Note ID must be an integer')
    .bail()
    .custom(async (value) => {
        try {
            const n_id=await db('notes').where('note_id',value).first();
            if(n_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("Note id not found.");
            }
        }catch (err) {
            return Promise.reject("Note id not found.");
        }
    });

const note_title = body('note_title')
    .optional()
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Note title must be between 3 and 100 characters');

const createNoteValidation = [content_type, content_id, note_text,note_title];
const deleteNoteValidation = [note_id];
const updateNoteValidation = [note_id, note_text,note_title];

const noteListValidation = [
    query('content_id')
        .notEmpty().withMessage('content_id is required')
        .isInt({ min: 1 }).withMessage('content_id must be a positive integer'),

    query('content_type')
        .notEmpty().withMessage('content_type is required')
        .isIn(['book', 'exam', 'slide', 'summary', 'video','assignment'])
        .withMessage('Invalid content_type')
];



module.exports = {
    createNoteValidation,
    deleteNoteValidation,
    updateNoteValidation,
    noteListValidation
};
