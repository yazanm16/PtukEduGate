/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('summaries',function(table) {
        table.increments('summary_id').primary();
        table.string('summary_name').notNullable();
        table.string('summary_path').notNullable();
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
    return knex.schema.dropTableIfExists('summaries');
};
