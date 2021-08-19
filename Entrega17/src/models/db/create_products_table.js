const { development } = require('./knexfile');
const knex = require('knex')(development);

knex.schema.createTable('products', (table) => {
  table.increments('id');
  table.string('title').notNullable();
  table.string('description');
  table.string('price').notNullable();
  table.string('thumbnail').notNullable();
  table.timestamps(true, true);
})
  .then(() => console.log('table created'))
  .catch((e) => console.log(e))
  .finally(() => {
    knex.destroy();
  })