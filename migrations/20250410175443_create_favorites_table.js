/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('favorites',function(table) {
        table.increments('id').primary();
        table.integer('student_id').notNullable();
        table.integer('content_id').notNullable();
        table.enu('content_type',['book','exam','course','slide','summary','video']).notNullable();

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('favorites');
};
