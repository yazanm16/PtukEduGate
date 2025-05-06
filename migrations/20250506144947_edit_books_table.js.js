/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable('books', function(table) {
      table.string('doctor_name').notNullable();
      table.integer('admin_id').notNullable().unsigned();
      table.foreign('admin_id').references('admin_id').inTable('admins');

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =async function(knex) {
  await knex.schema.alterTable('books', function(table) {
      table.dropForeign('admin_id');
      table.dropColumn('admin_id');
      table.dropColumn('doctor_name');
  })
};
