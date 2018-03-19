import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { createServer } from 'http';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import * as knex from '../database';
import * as applyHooks from '../database/hooks';
import * as runMigrations from '../database/migration-runner';
import QueryContext from './query-context';
import loadSchema from './schema-loader';
import { displayServer } from './lib/util';

export function run(
  { PORT: serverPort = 4000, SKIP_MIGRATIONS: skipMigrations = false },
  db: any
) {
  const app = express();

  const migrationPromise: any = skipMigrations
    ? Promise.resolve()
    : runMigrations();
  migrationPromise.then(() => applyHooks(knex));

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Setup graphql endpoint
  app.use(
    '/graphql',
    graphqlExpress((req: any) => ({
      schema: loadSchema(),
      context: new QueryContext(db.handle),
      formatError: (error: any) => ({
        message: error.message,
        details: error.originalError && error.originalError.details,
        locations: error.locations,
        path: error.path,
      }),
    }))
  );

  const initialGraphiqlQuery = `{
    reservations {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }`;

  // Setup graphiql endpoint
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      query: initialGraphiqlQuery,
    })
  );

  // Catchall error handler
  app.use((err: any, req: any, res: any, next: Function) => {
    console.log('ERROR:', err);
  });

  // need to use http's createServer to have ability to shut the server down
  const server = createServer(app);
  server.listen(serverPort, () => displayServer(server));

  return server;
}
