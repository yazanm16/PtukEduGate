const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const downloadMaterial=async (content_id,content_type)=>{
    const CONTENT_TYPE_CONFIG = {
        book: {
            table: 'books',
            idColumn: 'book_id',
            pathColumn: 'book_path',
            nameColumn: 'book_name',
        },
        exam: {
            table: 'exams',
            idColumn: 'exam_id',
            pathColumn: 'exam_path',
            nameColumn: 'exam_name',
        },
        slide: {
            table: 'slides',
            idColumn: 'slide_id',
            pathColumn: 'slide_path',
            nameColumn: 'slide_name',
        },
        summary: {
            table: 'summaries',
            idColumn: 'summary_id',
            pathColumn: 'summary_path',
            nameColumn: 'summary_name',
        },
        video: {
            table: 'videos',
            idColumn: 'video_id',
            pathColumn: 'video_path',
            nameColumn: 'video_name',
        }
    };
    if (!CONTENT_TYPE_CONFIG[content_type]) return null;

    // 3. Destructure the configuration
    const { table, idColumn, pathColumn, nameColumn } = CONTENT_TYPE_CONFIG[content_type];

    // 4. Fetch the file data
    const row = await db(table).where(idColumn, content_id).first();
    if (!row) return null;

    // 5. Return with fallback filename
    return {
        filePath: row[pathColumn],
        fileName: row[nameColumn] || `${content_type}_${content_id}`
    };


}
module.exports={downloadMaterial}