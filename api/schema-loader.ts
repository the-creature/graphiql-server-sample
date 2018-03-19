import { existsSync, readFileSync } from 'fs';
const find: any = require('find');
import { join as pathJoin } from 'path';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { getDirectories } from './lib/util';
import { isDev, isTest } from '../config';

export default function loadSchema() {
  const schemaTypes = getDirectories(pathJoin(__dirname, 'schema'));

  const typeSchemas: string[] = [];
  const schemaFiles = find.fileSync(
    /\.graphql$/,
    pathJoin(__dirname, 'schema')
  );
  schemaFiles.forEach((schemaFile: string) =>
    typeSchemas.push(readFileSync(schemaFile, 'utf8'))
  );

  const typeResolvers: Object[] = [];
  schemaTypes.forEach(t => {
    const resolverFile = `./schema/${t}/resolvers`;
    if (existsSync(pathJoin(__dirname, `${resolverFile}.ts`)))
      typeResolvers.push(require(resolverFile).default);
    if (existsSync(pathJoin(__dirname, `${resolverFile}.js`)))
      typeResolvers.push(require(resolverFile).default);
  });

  // In production there is a single schema file
  if (typeSchemas.length === 0) {
    typeSchemas.push(
      readFileSync(pathJoin(__dirname, '..', 'schema.graphql'), 'utf8')
    );
  }

  const resolvers: any = merge({}, ...typeResolvers);

  const executableSchema: any = makeExecutableSchema({
    resolvers,
    typeDefs: typeSchemas,
  });

  if (isDev && !isTest) {
    addMockFunctionsToSchema({
      schema: executableSchema,
      preserveResolvers: true,
    });
  }

  return executableSchema;
}
