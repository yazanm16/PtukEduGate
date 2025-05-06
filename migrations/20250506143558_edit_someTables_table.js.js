/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable('exams', function(table) {
      table.integer('upload_id').unsigned().nullable();
      table.foreign('upload_id').references('upload_id').inTable('upload');
  })
    await knex.schema.alterTable('slides', function(table) {
        table.integer('upload_id').unsigned().nullable();
        table.foreign('upload_id').references('upload_id').inTable('upload');
    })
    await knex.schema.alterTable('summaries', function(table) {
        table.integer('upload_id').unsigned().nullable();
        table.foreign('upload_id').references('upload_id').inTable('upload');
    })
    await knex.schema.alterTable('videos', function(table) {
        table.integer('upload_id').unsigned().nullable();
        table.foreign('upload_id').references('upload_id').inTable('upload');
    })
    await knex.schema.alterTable('books', function(table) {
        table.integer('upload_id').unsigned().nullable();
        table.foreign('upload_id').references('upload_id').inTable('upload');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('exams', function(table) {
      table.dropForeign('upload_id');
      table.dropColumn('upload_id');
  })
    await knex.schema.alterTable('slides', function(table) {
        table.dropForeign('upload_id');
        table.dropColumn('upload_id');
    })
    await knex.schema.alterTable('summaries', function(table) {
        table.dropForeign('upload_id');
        table.dropColumn('upload_id');
    })
    await knex.schema.alterTable('videos', function(table) {
        table.dropForeign('upload_id');
        table.dropColumn('upload_id');
    })
    await knex.schema.alterTable('books', function(table) {
        table.dropForeign('upload_id');
        table.dropColumn('upload_id');
    })
};
