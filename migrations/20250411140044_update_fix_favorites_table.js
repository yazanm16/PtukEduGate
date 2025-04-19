/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('favorites',function (table) {
      table.dropColumn('student_id');
  }).then(()=>{
      return knex.schema.alterTable('favorites', function(table) {
          table.integer('student_id').unsigned().notNullable()
              .references('student_id').inTable('students');
      })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('favorites', function (table) {
        table.dropForeign(['student_id']);
        table.dropColumn('student_id');
    }).then(() => {
        return knex.schema.alterTable('favorites', function (table) {
            table.integer('student_id').notNullable(); // بدون unsigned أو foreign
        });
    });
};

