/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const tables = ['books', 'exams', 'slides', 'summaries', 'videos'];

    for (const tableName of tables) {
        await knex.schema.alterTable(tableName, function(table) {
            table.dropForeign('upload_id');
        });

        await knex.schema.alterTable(tableName, function(table) {
            table.integer('upload_id').unsigned().nullable().alter();
            table.foreign('upload_id')
                .references('upload.upload_id')
                .onDelete('SET NULL');
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    const tables = ['books', 'exams', 'slides', 'summaries', 'videos'];

    for (const tableName of tables) {
        await knex.schema.alterTable(tableName, function(table) {
            table.dropForeign('upload_id');
        });

        await knex.schema.alterTable(tableName, function(table) {
            table.integer('upload_id').unsigned().notNullable().alter();
            table.foreign('upload_id')
                .references('upload.upload_id');
        });
    }
};
