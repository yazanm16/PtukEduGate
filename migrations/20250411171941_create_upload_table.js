/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('upload',function (table) {
      table.increments('upload_id').primary();
      table.integer('student_id').unsigned().notNullable()
          .references('student_id').inTable('students');
      table.integer('admin_id').unsigned().notNullable()
          .references('admin_id').inTable('admins');
      table.integer('course_id').unsigned().notNullable()
          .references('course_id').inTable('courses');
      table.enu('uploaded_state',['pending','approved','rejected']).notNullable();
      table.enu('uploaded_type',['book','exam','slide','summary','video']).notNullable();
      table.date('uploaded_datetime').notNullable().defaultTo(knex.fn.now());
      table.string('upload_name');
      table.string('doctor_name');
      table.string('upload_url');
      table.text('description');


  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('upload');
};
