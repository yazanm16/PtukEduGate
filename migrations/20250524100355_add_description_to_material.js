/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const tables = ['books', 'exams', 'slides', 'summaries', 'videos'];

    for (const table of tables) {
        await knex.schema.alterTable(table, function(t) {
            t.text('description').nullable()
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    const tables = ['books', 'exams', 'slides', 'summaries', 'videos'];

    for (const table of tables) {
        await knex.schema.alterTable(table, function(t) {
            t.dropColumn('description');
        });
    }
};
