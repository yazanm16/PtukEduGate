/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTable('notes', function (table) {
      table.increments('note_id').primary();
      table.integer('student_id').unsigned().notNullable()
          .references('student_id').inTable('students').onDelete('CASCADE');
      table.enum('content_type', ['book','exam','slide','summary','video']);
      table.integer('content_id').unsigned().notNullable();
      table.text('note_text');
      table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('notes');
};
