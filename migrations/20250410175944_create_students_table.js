/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('students',function(table) {
        table.increments('student_id').primary();
        table.string('student_name');
        table.string('student_username').notNullable().unique();
        table.string('student_email').notNullable().unique();
        table.string('student_password').notNullable();
        table.date('date_of_register').notNullable().defaultTo(knex.fn.now());

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
};
