/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('videos', function(table) {
        table.foreign('course_id').references('course_id').inTable('courses');
        table.foreign('admin_id').references('admin_id').inTable('admins');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('videos', function(table) {
        table.dropForeign('course_id');
        table.dropForeign('admin_id');
    })
};
