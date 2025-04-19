/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('exams',function (table) {
      table.foreign('admin_id').references('admin_id').inTable('admins');

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('exams',function (table) {
      table.dropForeign('admin_id');

  })
};
