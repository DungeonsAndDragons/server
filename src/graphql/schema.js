import fs from 'fs'
import { makeExecutableSchema, addResolveFunctionsToSchema } from 'graphql-tools'

import config from '../../config.json'
import { wrapInTokenVerification, tokenResolver } from './helpers/authentication'

// Resolvers
import Query from './resolvers/Query'
import Player from './resolvers/Player'
import Character from './resolvers/Character'
import Item from './resolvers/Item'
import InventoryEntry from './resolvers/InventoryEntry'
import SelectedSpell from './resolvers/SelectedSpell'
import Skill from './resolvers/Skill'

const typeDefs = fs.readFileSync(config.graphQL.schema, 'utf8');
const resolvers = wrapInTokenVerification({
    Query,
    Player,
    Character,
    Item,
    InventoryEntry,
    SelectedSpell,
    Skill
});

resolvers['Query']['token'] = tokenResolver;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
