/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exams',function(table) {
        table.increments('exam_id').primary();
        table.string('exam_name').notNullable();
        table.string('exam_path').notNullable();
        table.string('doctor_name').notNullable();
        table.integer('course_id').notNullable();
        table.integer('admin_id').notNullable().unsigned();

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('exams');
};
