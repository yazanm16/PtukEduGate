const knex=require('knex');
const knexConfig=require('../../../knexfile');
const db=knex(knexConfig);
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const {sendResetEmail} = require("../utils/sendResetEmail");

const login=async (emailOrUsername, password,rememberMe =false)=>{
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
        {expiresIn:rememberMe ?'30d':'6h'}
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

const forgotPassword=async (email)=>{
    let user;
    let role;
    user=await db('students').where({student_email:email}).first();
    if(user){
        const admin=await db('admins').where('student_id',user.student_id).first();
        if(admin){
            role=user.role;
        }else{
            role='student';
        }
    }else{
        throw new Error('User Not Found');
    }

    const token=jwt.sign({
        id:user.student_id,
        role:role
    },process.env.JWT_SECRET,
        {expiresIn: '15m'}
    );
    await sendResetEmail(email, token);
    return "Reset password link sent to your email";
}

const resetPassword=async (token,newPassword)=>{
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        const{id,role}=decodedToken;
        const hashedPassword=await bcrypt.hash(newPassword,10);
        if (role ==='student'){
            await db('students').where({student_id:id}).update({student_password:hashedPassword});
        }
        else if(role === 'admin' || role === 'superadmin'){
            const admin=await db('admins').where({admin_id:id}).first();
            if(!admin){
                throw new Error('Admin Not Found');
            }
            await Promise.all([
                db ('admins')
                    .where({admin_id:id}).update({admin_password:hashedPassword}),

                db ('students')
                    .where({student_id:admin.student_id}).update({student_password:hashedPassword}),

            ])
        }
        else{
            throw new Error('Invalid Role');
        }
        return "Password reset successfully";
    }catch(err){
        throw "Invalid or expired token";
    }
}

module.exports={
    login,forgotPassword,resetPassword
};