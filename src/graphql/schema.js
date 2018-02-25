import fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'

import config from '../../config.json'
import { Query } from './resolvers/query'
import { wrapInTokenVerification, tokenResolver } from './resolvers/authentication'

const typeDefs = fs.readFileSync(config.graphQL.schema, 'utf8');

const resolvers = wrapInTokenVerification({
    Query
});

resolvers['Query']['token'] = tokenResolver;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
