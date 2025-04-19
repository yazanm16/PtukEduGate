/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('courses', function(table) {
      table.dropForeign('student_id');
  }).then(()=>{
      return knex.schema.alterTable('courses', function(table) {
          table.dropColumn('student_id');
      })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('courses', function(table) {
      table.integer('student_id').notNullable().unsigned();
  }).then(()=>{
      return knex.schema.alterTable('courses', function(table) {
          table.foreign('student_id');
      })
  })
};
