const{body,param, query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);


const departments_id=param('departments_id').isInt().withMessage('Department ID is must be valid')
    .custom(async(val)=>{
        try {
            const d_id=await db('departments').where('departments_id',val).first();
            if(d_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject('No such Department');
            }
        }catch(e){
            return Promise.reject('No such Department');
        }
    })

const departments_name=body('departments_name').notEmpty().withMessage('Department Name is required');

const college_id=body('college_id').isInt().withMessage('College ID must be valid')
    .custom(async(val)=>{
        try{
            const coll_id=await db('colleges').where('college_id',val).first();
            if(coll_id){
                return Promise.resolve();
            }
            else{
                return Promise.reject('No such College');
            }
        }catch (e){
                return Promise.reject('No such College');
        }
    })


const createDepartmentValidation=[
    departments_name,
    college_id
]

const getDepartmentsValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('department_name').optional().isString().trim(),
    query('college_id').optional().isInt().withMessage('College ID must be Integer')
]

const updateDepartmentValidation=[
    departments_id,
    departments_name,
    college_id
]

const deleteDepartmentValidation=[
    departments_id
]
module.exports={
    createDepartmentValidation,
    getDepartmentsValidation,
    updateDepartmentValidation,
    deleteDepartmentValidation

}