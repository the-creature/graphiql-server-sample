const moment = require('moment');
const assign = require('lodash/assign');
const casual = require('casual');
const map = require('lodash/map');
const knex = require('../index');

const mapIds = (collection = []) =>
  map(collection, (item, id) => assign({}, item, { id: id + 1 }));

const resetSequence = (tableName, initial) =>
  knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH ${initial}`);

/**
 * Resets a provided table with the provided seed data
 */
const resetTable = (tableName, seed) =>
  knex(tableName)
    .delete()
    .then(() => resetSequence(tableName, 1))
    .then(() => knex(tableName).insert(seed))
    .then(() => knex(tableName).max('id'))
    .then(([{ max }]) => resetSequence(tableName, max + 1));

const sample = collection =>
  collection[casual.integer(0, collection.length - 1)];

const dateAfterDate = (
  startDate,
  number = casual.integer(1, 15),
  timeframe = 'months'
) => moment(startDate).add(number, timeframe).toISOString();

module.exports = {
  knex,
  mapIds,
  resetTable,
  sample,
  dateAfterDate,
};
