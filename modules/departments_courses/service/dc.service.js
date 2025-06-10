const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const linkCourseToDepartment =async (course_id, department_id, dc_type)=>{
    await db('departments_courses').insert({
        course_id,
        department_id,
        dc_type,
    })
    return true;
}

const listDepartmentsCourses=async (filters={})=>{
    let query = db('departments_courses as dc')
        .join('courses as c', 'dc.course_id', 'c.course_id')
        .select(
            'c.course_id',
            'c.course_name',
            'c.course_note',
            'dc.dc_type',
                    'dc.dc_id'
        )
        .where('dc.department_id', filters.department_id);

    if (filters.dc_type) {
        query = query.andWhere('dc.dc_type', filters.dc_type);
    }

    return await query;
}

const updateDC=async (dc_id,data)=>{
    return await db('departments_courses').where('dc_id',dc_id).update(data);
}

const deleteDC=async(dc_id)=>{
    return await db('departments_courses').where('dc_id',dc_id).delete();
}
module.exports={
    linkCourseToDepartment,
    listDepartmentsCourses,
    updateDC,
    deleteDC
}