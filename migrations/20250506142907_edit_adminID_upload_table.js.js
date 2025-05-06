/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('upload', function(table) {
        table.dropForeign('admin_id'); // إزالة الربط مؤقتًا
        table.integer('admin_id').unsigned().nullable().alter(); // تعديل العمود ليقبل NULL
        table.foreign('admin_id').references('admin_id').inTable('admins'); // إعادة الربط
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable('upload', function(table) {
        table.dropForeign('admin_id');
        table.integer('admin_id').unsigned().notNullable().alter(); // إعادة NOT NULL
        table.foreign('admin_id').references('admin_id').inTable('admins');
    });
};
