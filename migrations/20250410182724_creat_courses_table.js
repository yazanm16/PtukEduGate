/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('courses',function (table) {
        table.increments('course_id').primary();
        table.string('course_name').notNullable().unique();
        table.text('course_note').notNullable();
        table.integer('student_id').notNullable().unsigned();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('courses');
};
