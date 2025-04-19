/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function(knex) {
        return knex.schema.alterTable('courses', function(table) {
            table.foreign('student_id').references('student_id').inTable('students');
        })
    };

    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = function(knex) {
        return knex.schema.alterTable('courses', function(table) {
            table.dropForeign('student_id');

        })
    };

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
