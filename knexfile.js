const { database } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    debug: false, // set true to log all queries
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: database.connection,
  },

  localtest: {
    client: 'pg',
    // debug: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: 'postgres://localhost:5432/onlinePagestest',
  },

  production: {
    client: 'pg',
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/production',
    },
    connection: database.connection,
  },
};
