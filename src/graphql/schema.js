import fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'

import config from '../../config.json'
import { Query } from './resolvers/query'
import { wrapInTokenVerification } from './resolvers/authentication'

const typeDefs = fs.readFileSync(config.graphQL.schema, 'utf8');

const resolvers = wrapInTokenVerification({
    Query
});

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
