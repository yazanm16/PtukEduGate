const{body,param,query}=require('express-validator')
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const admin_id=param('admin_id').isInt().withMessage('Admin ID is must be valid')
    .custom(async(val)=>{
        try{
          const ad_id=await db('admins').where('admin_id',val).first();
          if(ad_id){
              return Promise.resolve();
          }
          else{
              return Promise.reject('no admin ID found.');
          }
        }catch(err){
                return Promise.reject('no admin ID found.');
        }
    })

const admin_name=body('admin_name').notEmpty().withMessage('Admin name is required');

const admin_username=body('admin_username').notEmpty().withMessage('Admin username is required')
    .custom(async(val,{req})=>{
        const user = await db('admins')
            .where('admin_username', val)
            .andWhereNot('admin_id', req.user.id).first();
        if(user){
            return Promise.reject('This username already exists');
        }
        return true;
    });

const admin_email = body('admin_email')
    .notEmpty().withMessage('Admin email is required')
    .isEmail().withMessage('Email is not valid')
    .custom(async (val, { req }) => {
        const email = val.toLowerCase();
        const user = await db('admins')
            .where('admin_email', email)
            .andWhereNot('admin_id', req.user.id)
            .first();

        if (user) {
            return Promise.reject('This email already exists');
        }

        return true;
    });

const admin_password=body('admin_password','Student passwords are required').notEmpty()
    .custom(async(val)=>{
        if(val && val.length<6){
            return Promise.reject('The password should be greater then 6 character');
        }
        else{
            return Promise.resolve();
        }
    })
const new_password=body('new_password','New passwords are required')
    .custom(async (val, { req }) => {
        if(val && val.length<6){
            return Promise.reject('The password should be greater then 6 character');
        }
        else{
            return Promise.resolve();
        }
    })

const student_id=body('student_id').notEmpty().withMessage('Student ID is required')
    .custom(async(val)=>{
        const s_id=await db('students').where('student_id',val).first();
        if(!s_id){
            return Promise.reject('Student not found');
        }
        return true;
    });

const department_id=body('department_id').notEmpty().withMessage('Department is required')
    .custom(async(val)=>{
        const d_id=await db('departments').where('department_id',val).first();
        if(!d_id){
            return Promise.reject('Department not found');
        }
        return true;
    });

const role=body('role').optional().isIn(['admin','superadmin']).withMessage('Role must be admin or superadmin');

const createAdminValidation=[
    student_id,department_id,role
]
const deleteAdminValidation=[
    admin_id
]

const updateAdminValidation=[
    admin_name,admin_email,admin_username
]
const getAdminsValidation=[
    query('id').optional().isInt().withMessage('ID must be an integer'),
    query('role').optional().isIn(['admin', 'superadmin']).withMessage('Role must be valid'),
    query('admin_name').optional().isString().trim(),
    query('admin_username').optional().isString().trim()
]

const changeAdminPasswordValidation=[
    new_password,admin_password
]
module.exports={
    createAdminValidation,
    deleteAdminValidation,
    updateAdminValidation,
    getAdminsValidation,
    changeAdminPasswordValidation
}