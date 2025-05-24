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
     return await db('colleges').where('college_id',college_id).delete();
}

const listCollege=async (filters={})=>{
    let query=db('colleges')
    if(filters.id)query=query.where('college_id',filters.id);
    if (filters.college_name)query=query.where('college_name',filters.college_name);

    return await query.select('*');
}

const updateCollege=async(college_id,data)=>{
    return await db('colleges').where('college_id',college_id).update(data);
}
module.exports={
    createCollege,
    deleteCollege,
    listCollege,
    updateCollege
}