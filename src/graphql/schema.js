import fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'

import config from '../../config.json'
import { Query } from './resolvers/query'

const typeDefs = fs.readFileSync(config.graphQL.schema, 'utf8');

const resolvers = {
    Query
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
