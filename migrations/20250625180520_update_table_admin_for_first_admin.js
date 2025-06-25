exports.up = async function(knex) {
    return knex.schema.alterTable('admins', function(table) {
        table.dropColumn('department_id'); // احذف العمود مباشرة
    }).then(() => {
        return knex.schema.alterTable('admins', function(table) {
            table.integer('department_id').nullable().unsigned();
            table.foreign('department_id').references('departments_id').inTable('departments');
        });
    });
};

exports.down = async function(knex) {
    return knex.schema.alterTable('admins', function(table) {
        table.dropColumn('department_id');
    }).then(() => {
        return knex.schema.alterTable('admins', function(table) {
            table.integer('department_id').notNullable().unsigned();
            table.foreign('department_id').references('departments_id').inTable('departments');
        });
    });
};
