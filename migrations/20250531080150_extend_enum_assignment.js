/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`ALTER TABLE upload MODIFY uploaded_type ENUM('book', 'exam', 'slide', 'summary', 'video', 'assignment')`);
    await knex.raw(`ALTER TABLE notes MODIFY content_type ENUM('book', 'exam', 'slide', 'summary', 'video', 'assignment')`);
    await knex.raw(`ALTER TABLE favorites MODIFY content_type ENUM('book', 'exam', 'slide', 'summary', 'video', 'assignment')`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`ALTER TABLE upload MODIFY uploaded_type ENUM('book', 'exam', 'slide', 'summary', 'video')`);
    await knex.raw(`ALTER TABLE notes MODIFY content_type ENUM('book', 'exam', 'slide', 'summary', 'video')`);
    await knex.raw(`ALTER TABLE favorites MODIFY content_type ENUM('book', 'exam', 'slide', 'summary', 'video','course')`);
};
