/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('departments_courses', function(table) {
        table.dropForeign('department_id');
    });

    await knex.schema.alterTable('departments_courses', function(table) {
        table.integer('department_id').unsigned().notNullable().alter();
        table.foreign('department_id')
            .references('departments.departments_id')
            .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable('departments_courses', function(table) {
        table.dropForeign('department_id');
    });

    await knex.schema.alterTable('departments_courses', function(table) {
        table.integer('department_id').unsigned().notNullable().alter();
        table.foreign('department_id')
            .references('departments.departments_id');
    });
};
