import 'babel-polyfill'
import express from 'express'
// import { combineResolvers } from 'graphql-resolvers'

import { logger, attachLogger } from './log'
import { serveGraphQL, serveGraphIQL } from './graphql/resources'

// Initialize the app
const app = express();

// Attach winston middleware
attachLogger(app);

// GraphiQL, a visual editor for queries
if (process.env.NODE_ENV !== 'production') serveGraphIQL(app);

// GraphQL API
serveGraphQL(app);

// Start the server
app.listen(3000, () => {
    logger.info('Serving request.');
});
