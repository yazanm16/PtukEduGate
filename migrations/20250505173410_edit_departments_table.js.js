/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('departments', function(table) {
      table.dropColumn('college_name');
  }).then(function () {
      return knex.schema.alterTable('departments',function (table) {
          table.integer('college_id').notNullable().unsigned();
          table.foreign('college_id').references('college_id').inTable('colleges');
      });
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('departments', function(table) {
        table.dropColumn('college_id');
        table.string('college_name').notNullable();
    })
};
