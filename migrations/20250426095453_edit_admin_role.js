/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('admins', function(table) {
        table.dropColumn('role');
    }).then(function() {
        return knex.schema.alterTable('admins', function(table) {
            table.enu('role', ['admin', 'superadmin']).notNullable().defaultTo('admin');
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('admins', function(table) {
        table.dropColumn('role');
    }).then(function() {
        return knex.schema.alterTable('admins', function(table) {
            table.enu('role', ['admin', 'super admin']).notNullable().defaultTo('admin');
        });
    });
};
