/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('slides', function (table) {
        table.increments('slide_id').primary();
        table.string('slide_name').notNullable();
        table.string('slide_path').notNullable();
        table.string('doctor_name').notNullable();
        table.integer('course_id').notNullable().unsigned();
        table.integer('admin_id').notNullable().unsigned();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTableIfExists('slides');
};
