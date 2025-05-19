const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const addFavorite = async ({ student_id, content_id, content_type }) => {
    return await db('favorites').insert({ student_id, content_id, content_type });
};

const removeFavorite = async (favorite_id,student_id) => {
    return await db('favorites').where({ id:favorite_id,student_id }).del();
};

const listFavorites = async (student_id) => {
    const favorites = await db('favorites').where({ student_id });

    const tableMap = {
        book: 'books',
        exam: 'exams',
        slide: 'slides',
        summary: 'summaries',
        video: 'videos',
        course:'courses'
    };

    const results = [];

    for (const fav of favorites) {
        const table = tableMap[fav.content_type];
        const id_column = `${fav.content_type}_id`;
        const data = await db(table).where(id_column, fav.content_id).first();

        if (data) {
            results.push({
                favorite_id: fav.favorite_id,
                content_type: fav.content_type,
                content_id: fav.content_id,
                content_data: data
            });
        }
    }

    return results;
};

module.exports = {
    addFavorite,
    removeFavorite,
    listFavorites
};
