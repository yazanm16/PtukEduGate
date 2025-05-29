const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {filters} = require("pug");
const db = knex(knexConfig);


const createCollege=async(college_name)=>{
    await db('colleges').insert({
        college_name:college_name,
    });
}

const deleteCollege=async(college_id)=>{
    const reasons=[]
    const existDepartment=await db('departments').where('college_id',college_id).first();
    if(existDepartment)reasons.push("college has departments, can't delete");
    if (reasons.length > 0) {
        return { status: 'blocked', reasons };
    }
     const deleted= await db('colleges').where('college_id',college_id).delete();
        return deleted===0 ?{status:'not_found'} : {status:'deleted'}
}

const listCollege=async (filters={})=>{
    let query=db('colleges')
    if(filters.id)query=query.where('college_id',filters.id);
    if (filters.college_name)query=query.where('college_name',filters.college_name);

    return await query.select('*');
}

const updateCollege=async(college_id,college_name)=>{
    return await db('colleges').where('college_id',college_id).update({
        college_name:college_name,
    });
}
module.exports={
    createCollege,
    deleteCollege,
    listCollege,
    updateCollege
}