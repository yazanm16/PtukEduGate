/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('exams', function(table) {
        table.dropColumn('course_id');
    }).then(() => {
        return knex.schema.alterTable('exams', function(table) {
            table.integer('course_id').unsigned().notNullable();
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('exams', function(table) {
        table.dropColumn('course_id');
    }).then(() => {
        return knex.schema.alterTable('exams', function(table) {
            table.integer('course_id').notNullable();
        });
    });
};
