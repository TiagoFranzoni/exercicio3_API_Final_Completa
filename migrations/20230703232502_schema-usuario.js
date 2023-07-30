/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("usuario", tbl => {
        tbl.increments ('id');
        tbl.text ("nome", 200).notNullable();
        tbl.text ("login", 200).unique ().notNullable();
        tbl.text ("email", 200).notNullable();
        tbl.text ("senha", 100).notNullable();
        tbl.text ("roles", 200).defaultTo('USER').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("usuario");
};
