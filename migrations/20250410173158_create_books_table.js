/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments('book_id').primary();
        table.string('book_name').notNullable().unique();
        table.string('book_path').notNullable().unique();
        table.integer('course_id').notNullable().unsigned();
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
