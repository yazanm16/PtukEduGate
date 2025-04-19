const knex=require('knex');
const knexConfig=require('../../../knexfile');
const db=knex(knexConfig);
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const {studentCreate} = require("../../student/service/student.service");

const login=async (emailOrUsername, password)=>{
    let user;
    let role;
    let userId;
    let userPassword;
    const isEmail=emailOrUsername.includes('@');

    if(isEmail){
        user=await db('admins').where({admin_email:emailOrUsername}).first();
        if(user){
            role=user.role;
            userId=user.admin_id;
            userPassword=user.admin_password;
        }else {
            user=await db('students').where({student_email:emailOrUsername}).first();
            if(user){
                role='student';
                userId=user.student_id;
                userPassword=user.student_password;
            }
        }
    }else{
        user=await db('admins').where({admin_username:emailOrUsername}).first();
        if(user){
            role=user.role;
            userId=user.admin_id;
            userPassword=user.admin_password;
        }else {
            user=await db('students').where({student_username:emailOrUsername}).first();
            if(user){
                role='student';
                userId=user.student_id;
                userPassword=user.student_password;
            }
        }
    }
    if(!user){
        throw new Error('User Not Found');
    }
    const isMatch = await bcrypt.compare(password, userPassword);
    if (!isMatch) {
        throw new Error('User Not Match');
    }

    const token=jwt.sign({
        id:userId,
        email:user.admin_email || user.student_email,
        role:role

    },process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
    return{
        token,
        role,
        user:{
            id:userId,
            email:user.admin_email||user.student_email,
            username:user.admin_username||user.student_username,
            name:user.admin_name||user.student_name,
        }
    };
};
module.exports={
    login
};