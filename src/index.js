// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');

import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { connect } from './db';

// Connect to the DB
connect();

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
const typeDefs = fs.readFileSync('src/schema.graphql', 'utf8');

// The resolvers
const resolvers = {
    Query: {
        dies: () => "D20"
    }
    // Query: { books: (_, args) => {
    //     console.log(args);
    //     return books;
    // }},
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
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});
