/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('departments_courses',function(table) {
      table.increments('dc_id').primary();
      table.integer('course_id').unsigned().notNullable()
          .references('course_id').inTable('courses');
      table.integer('department_id').unsigned().notNullable()
          .references('departments_id').inTable('departments');
      table.string('dc_type').notNullable();

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('departments_courses');
};
