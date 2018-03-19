/* eslint-disable camelcase */
const casual = require('casual');
const { times } = require('lodash');
const { mapIds, dateAfterDate } = require('../utils');

module.exports = () => {
  const reservations = [];

  times(15, () => {
    const startDate = casual.moment.toISOString();
    const endDate = dateAfterDate(startDate, casual.integer(0, 2), 'days');

    reservations.push({
      id: casual.id,
      name: casual.full_name,
      hotelName: casual.full_name,
      arrivalDate: startDate,
      departureDate: endDate,
    });
  });

  return mapIds(reservations);
};
