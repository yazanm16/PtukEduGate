/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('videos',function(table){
        table.increments('video_id').primary();
        table.string('video_name').notNullable();
        table.string('video_path').notNullable();
        table.string('doctor_name').notNullable();
        table.integer('course_id').notNullable().unsigned();
        table.integer('admin_id').notNullable().unsigned();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('videos');
};
