/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // 1. upload.student_id → SET NULL
    await knex.schema.alterTable('upload', function(table) {
        table.dropForeign('student_id');
    });
    await knex.schema.alterTable('upload', function(table) {
        table.integer('student_id').unsigned().nullable().alter();
        table.foreign('student_id')
            .references('students.student_id')
            .onDelete('SET NULL');
    });

    // 2. favorites.student_id → CASCADE
    await knex.schema.alterTable('favorites', function(table) {
        table.dropForeign('student_id');
    });
    await knex.schema.alterTable('favorites', function(table) {
        table.integer('student_id').unsigned().notNullable().alter();
        table.foreign('student_id')
            .references('students.student_id')
            .onDelete('CASCADE');
    });

    // 3. students_courses.student_id → CASCADE
    await knex.schema.alterTable('students_courses', function(table) {
        table.dropForeign('student_id');
    });
    await knex.schema.alterTable('students_courses', function(table) {
        table.integer('student_id').unsigned().notNullable().alter();
        table.foreign('student_id')
            .references('students.student_id')
            .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    // 1. upload → رجع بدون SET NULL
    await knex.schema.alterTable('upload', function(table) {
        table.dropForeign('student_id');
    });
    await knex.schema.alterTable('upload', function(table) {
        table.integer('student_id').unsigned().notNullable().alter();
        table.foreign('student_id')
            .references('students.student_id');
    });

    // 2. favorites
    await knex.schema.alterTable('favorites', function(table) {
        table.dropForeign('student_id');
    });
    await knex.schema.alterTable('favorites', function(table) {
        table.integer('student_id').unsigned().notNullable().alter();
        table.foreign('student_id')
            .references('students.student_id');
    });

    // 3. students_courses
    await knex.schema.alterTable('students_courses', function(table) {
        table.dropForeign('student_id');
    });
    await knex.schema.alterTable('students_courses', function(table) {
        table.integer('student_id').unsigned().notNullable().alter();
        table.foreign('student_id')
            .references('students.student_id');
    });
};
