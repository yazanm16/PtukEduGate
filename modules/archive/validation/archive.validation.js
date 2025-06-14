const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const id=param('id').isInt().withMessage('Archive id must be an integer').bail()
.custom(async (value)=>{
    try{
        const ar_id=await db('archives').where('id', value).first();
        if(ar_id){
            return Promise.resolve()
        }
        else {
            return Promise.reject('invalid id')
        }
    }
    catch(err){
        return Promise.reject("Archive not found.");
    }
})
const getArchiveValidation=[
    query('content_type').optional().isIn(['book', 'exam', 'slide', 'video', 'summary', 'course', 'assignment']),
    query('deleted_by').optional().isInt(),
]

const restoreArchiveValidation=[
    id
]
const deleteArchiveValidation=[
    id
]

module.exports= {
    getArchiveValidation,
    restoreArchiveValidation,
    deleteArchiveValidation
};