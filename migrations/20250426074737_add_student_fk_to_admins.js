exports.up = function(knex) {
    return knex.schema.alterTable('admins', function(table) {
        table.integer('student_id').notNullable().unsigned();

        table.foreign('student_id')
            .references('student_id')
            .inTable('students')

    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('admins', function(table) {
        table.dropForeign(['student_id']);
        table.dropColumn('student_id');
    });
};
