/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    await knex.schema.alterTable('colleges', function(table) {
        table.string('image').nullable()
    });
    await knex('colleges').insert([
        {
            college_name: 'كلية الهندسة والتكنولوجيا',
            image: '/images/colleges/engineering.png',
        },
        {
            college_name: 'كلية العلوم التطبيقية',
            image: '/images/colleges/Science.png',
        },
        {
            college_name: 'كلية تكنولوجيا المعلومات والذكاء الاصطناعي',
            image: '/images/colleges/computer.png',
        },
        {
            college_name: 'كلية العلوم والتكنولوجيا الزراعية',
            image: '/images/colleges/agriculture.png',
        },
        {
            college_name: 'كلية الأعمال والاقتصاد',
            image: '/images/colleges/economic.png',
        },
        {
            college_name: 'كلية التربية البدنية وعلوم الرياضة',
            image: '/images/colleges/sports.png',
        },
        {
            college_name: 'كلية الآداب والعلوم التربوية',
            image: '/images/colleges/Arts.png',
        }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable('colleges', function(table) {
        table.dropColumn('image');
    });
};
