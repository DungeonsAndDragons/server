import 'babel-polyfill'
import express from 'express'
import cors from 'cors'

import { logger, attachLogger } from './log'
import { registerTokenResource, generateDevelopmentToken } from './authentication/token'
import { serveGraphQL, serveGraphIQL } from './graphql/resources'
import {serveBinaryResources} from "./binaryStorage/resources";

// Initialize the app
const app = express();

// Enable cross origin requests
app.use(cors());

// Attach winston middleware
attachLogger(app);

// Register token issuer
registerTokenResource(app);

// GraphiQL, a visual editor for queries
if (process.env.NODE_ENV !== 'production') {
    serveGraphIQL(app);

    console.log("The following is the development token. Do NOT share it as it is valid indefinitely.");
    console.log(generateDevelopmentToken());
}

// GraphQL API
serveGraphQL(app);

// Binary data API
serveBinaryResources(app);

// Start the server
app.listen(3000, () => {
    logger.info('Serving request.');
});
