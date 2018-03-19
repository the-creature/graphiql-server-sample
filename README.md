# Hilton Server

**Requirements**

- Node => 8.0.0
- Postgres (9.*)

### Installation

1) `yarn` to install dependencies
2) `createdb hilton` to create relevant databases
3) `cp .env.example .env` to initialize your `.env` file
3) `yarn dev` to run development environment
4) `yarn migrations` to generate seed data
5) `yarn seed` to generate seed data
6) Review schema at http://localhost:4000/graphiql
