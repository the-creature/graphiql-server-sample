# Hilton Server

**Requirements**

- Node => 8.0.0
- Postgres (9.\*)

### Installation

1. `yarn` to install dependencies
2. `createdb hilton` to create relevant databases
3. `cp .env.example .env` to initialize your `.env` file
4. `yarn dev` to run development environment
5. `yarn migrations` to generate seed data
6. `yarn seed` to generate seed data
7. Review schema at http://localhost:4000/graphql

![preview](https://github.com/the-creature/graphiql-server-sample/blob/master/sample.gif)
