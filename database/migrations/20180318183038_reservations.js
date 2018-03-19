exports.up = knex =>
  knex.schema.createTable('reservations', table => {
    table.increments('id');
    table.string('name');
    table.string('hotel_name');
    table.string('arrival_date');
    table.string('departure_date');
  });

exports.down = knex => knex.schema.dropTable('reservations');
