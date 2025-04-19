/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('students_courses',function(table) {
      table.increments('SC_id').primary();
      table.integer('course_id').notNullable().unsigned()
          .references('course_id').inTable('courses');
      table.integer('student_id').notNullable().unsigned()
          .references('student_id').inTable('students');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students_courses');
};
