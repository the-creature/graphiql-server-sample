import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import knex from "../database";
import applyHooks from "../database/hooks";
import runMigrations from "../database/migration-runner";
import QueryContext from "./query-context";
import loadSchema from "./schema-loader";
import { displayServer } from "./lib/util";

export function run(
  {
    isDev = true,
    PORT: serverPort = 4000,
    SKIP_MIGRATIONS: skipMigrations = false
  },
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

  // Catchall error handler
  app.use((err: any, req: any, res: any, next: Function) => {
    console.log("ERROR:", err);
  });

  const initialGraphqlQuery = `{
    reservations {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }`;

  const server = new ApolloServer({
    schema: loadSchema(),
    context: new QueryContext(db.handle),
    formatError: (error: any) => ({
      message: error.message,
      details: error.originalError && error.originalError.details,
      locations: error.locations,
      path: error.path
    }),
    playground: isDev
      ? {
          tabs: [
            {
              endpoint: "/graphql",
              query: initialGraphqlQuery
            }
          ]
        }
      : false
  });

  server.applyMiddleware({ app });

  app.listen({ port: serverPort }, () => displayServer(serverPort));

  return app;
}
