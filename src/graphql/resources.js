import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'

import config from '../../config.json'
import { schema } from './schema'

export function serveGraphIQL(app) {
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

export function serveGraphQL(app) {
    app.use(
        config.graphQL.url,
        bodyParser.json(),
        graphqlExpress(req => {
            return {
                schema: schema,
                context: {
                    authorization: req.token,
                }
            };
        }),
    );
}
