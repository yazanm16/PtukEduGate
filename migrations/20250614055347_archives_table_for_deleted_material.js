// migrations/20250613_create_archives_table.js

exports.up = function(knex) {
    return knex.schema.createTable('archives', function(table) {
        table.increments('id').primary();
        table.integer('content_id').notNullable();
        table.enu('content_type', ['book', 'exam', 'slide', 'video', 'summary','assignment']).notNullable();
        table.string('file_path').notNullable();
        table.integer('deleted_by').unsigned().nullable()
        table.timestamp('deleted_at').notNullable().defaultTo(knex.fn.now());
        table.json('original_data').notNullable();
        table.foreign('deleted_by').references('admin_id').inTable('admins').onDelete('SET NULL');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('archives');
};
