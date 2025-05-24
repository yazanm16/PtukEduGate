const{body,param, query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const college_id=param('college_id').isInt().withMessage('The college ID is required')
    .bail()
    .custom(async(value)=>{
        try {
            const c_id=await db('colleges').where({college_id:value}).first();
            if(c_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject("College not found.");
            }
        }catch(err){
            return Promise.reject("College not found.");
        }
    })

const college_name=()=>body('college_name').notEmpty().withMessage('The college name is required');

const createCollegeValidation=[
    college_name
]
const deleteCollegeValidation=[
    college_id
]
const updateCollegeValidation=[
    college_id,
    college_name().optional()
]
const getCollegesValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('college_name').optional().isString().trim()
]

module.exports={
    createCollegeValidation,
    deleteCollegeValidation,
    getCollegesValidation,
    updateCollegeValidation
}