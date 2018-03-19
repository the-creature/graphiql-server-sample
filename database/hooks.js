const knexHooks = require('knex-hooks');

function applyHooks(knex) {
  knexHooks(knex);
}

module.exports = applyHooks;
