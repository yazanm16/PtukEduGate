exports.up = function(knex) {
    return knex.schema.alterTable('departments', function(table) {
        table.dropColumn('admin_id');  // نحذف العمود
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('departments', function(table) {
        table.integer('admin_id').unsigned();

    });
};
