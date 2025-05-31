/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('assignments', function(table) {
        table.increments('assignment_id').primary();
        table.string('assignment_name').notNullable();
        table.string('assignment_path').notNullable();
        table.string('doctor_name').notNullable();
        table.integer('admin_id').unsigned().nullable();
        table.integer('course_id').unsigned().notNullable();
        table.integer('upload_id').unsigned().nullable();
        table.text('description').nullable();
        table.foreign('admin_id').references('admin_id').inTable('admins').onDelete('SET NULL');
        table.foreign('course_id').references('course_id').inTable('courses')
        table.foreign('upload_id').references('upload_id').inTable('upload').onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('assignments');
};
