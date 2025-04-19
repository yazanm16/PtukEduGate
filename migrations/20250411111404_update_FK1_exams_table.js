/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('exams',function (table) {
        table.foreign('course_id').references('course_id').inTable('courses');

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('exams',function (table) {
        table.dropForeign('course_id');

    })
};
