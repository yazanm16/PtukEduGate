const knex = require('knex');
const knexConfig = require('../../../knexfile');
const fs = require('fs');
const path = require('path');
const db = knex(knexConfig);

const getArchive=async(filters)=>{
    let query = db('archives');

    if (filters.content_type) query = query.where('content_type', filters.content_type);
    if (filters.deleted_by) query = query.where('deleted_by', filters.deleted_by);

    return await query.select('*').orderBy('deleted_at', 'desc');
}

const restoreArchive=async(archiveId)=>{
    const archive = await db('archives').where('id', archiveId).first();
    if (!archive) throw new Error('Archived content not found');

    const { content_type, original_data, file_path } = archive;
    const data = JSON.parse(original_data);
    if (data.course_id) {
        const courseExists = await db('courses')
            .where('course_id', data.course_id)
            .first();
        if (!courseExists) {
            throw new Error('Cannot restore: the associated course has been deleted, delete it if you need.');
        }
    }

    const fileName = path.basename(file_path);
    const fromPath = path.join(__dirname, '..', '..','..', 'public', 'uploads', file_path);
    const toPath = path.join(__dirname, '..', '..','..','public', 'uploads', content_type, fileName);

    if (fs.existsSync(fromPath)) {
        fs.mkdirSync(path.dirname(toPath), { recursive: true });
        fs.renameSync(fromPath, toPath);
    }

    const pathField = `${content_type}_path`;
    data[pathField] = `uploads/${content_type}/${fileName}`;
    await db(content_type + 's').insert(data);

    await db('archives').where('id', archiveId).delete();

    return { restored_to: content_type, content_id: data[`${content_type}_id`] };
}

const deleteArchive=async(archiveId)=>{
    const archive = await db('archives').where('id', archiveId).first();
    if (!archive) return null;

    const { file_path } = archive;
    const fileFullPath = path.join(__dirname, '..', '..','..', 'public', 'uploads', file_path);
    if (fs.existsSync(fileFullPath)) {
        fs.unlinkSync(fileFullPath);
    }
    await db('archives').where('id', archiveId).delete();

    return true;
}
module.exports={
    getArchive,
    restoreArchive,
    deleteArchive
}