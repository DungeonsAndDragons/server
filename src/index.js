import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { combineResolvers } from 'graphql-resolvers'

import config from '../config.json'
import { database, initializeDatabase } from './db';

initializeDatabase();

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// Some fake mutations
function book(parent, args, context, info) {
    const { title, author } = args
    console.log(title, author);
    return books[0]
}

// The GraphQL schema in string form
const typeDefs = fs.readFileSync(config.graphQL.schema, 'utf8');

const isAuthenticated = (root, args, context, info) => {
    if (!context.user) {
        return new Error('Not authenticated')
    }
}

// The resolvers
const resolvers = {
    Query: {
        dies: async (_, args, context) => {
            try {
              const db = await database;
              const [post, categories] = await Promise.all([
                db.get('SELECT * FROM Post WHERE id = ?', "someID"), // use args.id
                db.all('SELECT * FROM Category')
              ]);
              res.render('post', { post, categories });
            } catch (err) {
              return err; // new Error('Oh noes! Something went wrong ...');
            }
        }
    }
    // Mutation: { book }
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => {
        return {
            schema: schema,
            context: {
                authorization: req.headers.authorization,
            }
        };
    }),
);

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});
