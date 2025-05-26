/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('books', function (table) {
        table.string('book_name').nullable().alter();
    });

    await knex.schema.alterTable('exams', function (table) {
        table.string('exam_name').nullable().alter();
    });

    await knex.schema.alterTable('slides', function (table) {
        table.string('slide_name').nullable().alter();
    });

    await knex.schema.alterTable('summaries', function (table) {
        table.string('summary_name').nullable().alter();
    });

    await knex.schema.alterTable('videos', function (table) {
        table.string('video_name').nullable().alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable('books', function (table) {
        table.string('book_name').notNullable().alter();
    });

    await knex.schema.alterTable('exams', function (table) {
        table.string('exam_name').notNullable().alter();
    });

    await knex.schema.alterTable('slides', function (table) {
        table.string('slide_name').notNullable().alter();
    });

    await knex.schema.alterTable('summaries', function (table) {
        table.string('summary_name').notNullable().alter();
    });

    await knex.schema.alterTable('videos', function (table) {
        table.string('video_name').notNullable().alter();
    });
};
