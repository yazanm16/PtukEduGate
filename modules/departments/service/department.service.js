const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const createDepartment=async ({departments_name, college_id})=>{
    await db('departments').insert({departments_name, college_id});
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
    const reasons=[]
    const existAdmin=await db('admins').where('department_id',departments_id).first();
    if(existAdmin) reasons.push("can't delete department because there is an admin connected to it") ;
    if (reasons.length > 0) {
        return { status: 'blocked', reasons };
    }
    const deleted = await db('departments').where('departments_id',departments_id).delete();
    return deleted===0 ?{status:'not_found'} : {status:'deleted'}


}
module.exports={
    createDepartment,
    DepartmentList,
    updateDepartment,
    deleteDepartment
}