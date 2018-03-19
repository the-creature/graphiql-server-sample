import knex from './connector';
import { run } from './server';

run(process.env, { handle: knex });
