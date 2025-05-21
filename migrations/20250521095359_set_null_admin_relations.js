/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const tables = ['books', 'exams', 'slides', 'summaries', 'videos', 'upload'];

    for (const tableName of tables) {
        await knex.schema.alterTable(tableName, function(table) {
            table.dropForeign('admin_id');
        });

        await knex.schema.alterTable(tableName, function(table) {
            table.integer('admin_id').unsigned().nullable().alter();
            table.foreign('admin_id')
                .references('admins.admin_id')
                .onDelete('SET NULL');
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    const tables = ['books', 'exams', 'slides', 'summaries', 'videos', 'upload'];

    for (const tableName of tables) {
        await knex.schema.alterTable(tableName, function(table) {
            table.dropForeign('admin_id');
        });

        await knex.schema.alterTable(tableName, function(table) {
            table.integer('admin_id').unsigned().notNullable().alter();
            table.foreign('admin_id')
                .references('admins.admin_id'); // يرجع بدون ON DELETE SET NULL
        });
    }
};
