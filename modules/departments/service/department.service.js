const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createDepartment=async (departments_name,college_id)=>{
    await db('departments').insert(departments_name,college_id);
}

const DepartmentList=async (filters={})=>{
    let query=db('departments')
    if(filters.id)query=query.where('department_id',filters.id);
    if(filters.departments_name)query=query.where('department_name',filters.departments_name);
    if(filters.college_id)query=query.where('college_id',filters.college_id);

    return await query.select('*');
}

const updateDepartment=async (departments_id,data)=>{
    return await db('departments').where('departments_id',departments_id).update(data);
}

const deleteDepartment=async(departments_id)=>{
    return await db('departments').where('departments_id',departments_id).delete();
}
module.exports={
    createDepartment,
    DepartmentList,
    updateDepartment,
    deleteDepartment
}