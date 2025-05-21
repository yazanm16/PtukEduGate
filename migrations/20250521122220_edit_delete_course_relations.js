/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const tables = ['departments_courses', 'students_courses'];

    for (const tableName of tables) {
        await knex.schema.alterTable(tableName, function(table) {
            table.dropForeign('course_id');
        });

        await knex.schema.alterTable(tableName, function(table) {
            table.integer('course_id').unsigned().notNullable().alter();
            table.foreign('course_id')
                .references('courses.course_id')
                .onDelete('CASCADE')
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    const tables = ['departments_courses', 'students_courses'];

    for (const tableName of tables) {
        await knex.schema.alterTable(tableName, function(table) {
            table.dropForeign('course_id');
        });

        await knex.schema.alterTable(tableName, function(table) {
            table.integer('course_id').unsigned().notNullable().alter();
            table.foreign('course_id')
                .references('courses.course_id');
        });
    }
};
