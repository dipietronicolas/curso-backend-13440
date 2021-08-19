
exports.up = function(knex) {
  return knex.schema.createTable('mensajes', (table) => {
    table.increments('id');
    table.string('email').notNullable();
    table.string('message').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('mensajes');
};
