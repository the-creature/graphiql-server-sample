const knexCleaner = require('knex-cleaner');
const casual = require('casual');
const knex = require('../../index');
const { resetTable } = require('../utils');

casual.seed(1);
const reservations = require('../objects/reservations')();

exports.seed = () =>
  knexCleaner
    .clean(knex, {
      ignoreTables: ['migrations', 'migrations_lock'],
    })
    .then(() => resetTable('reservations', reservations));
