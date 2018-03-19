exports.up = knex =>
  knex.schema.createTable('reservations', table => {
    table.increments('id');
    table.string('name');
    table.string('hotelName');
    table.string('arrivalDate');
    table.string('departureDate');
  });

exports.down = knex => knex.schema.dropTable('reservations');
