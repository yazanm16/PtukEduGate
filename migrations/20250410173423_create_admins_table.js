/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('admins', function (table) {
        table.increments('admin_id').primary();
        table.string('admin_name').notNullable();
        table.string('admin_username').notNullable().unique();
        table.string('admin_email').notNullable().unique();
        table.string('admin_password').notNullable().unique();
        table.date('date_of_register').notNullable().defaultTo(knex.fn.now());
        table.integer('department_id').notNullable().unsigned();

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('admins');
};
