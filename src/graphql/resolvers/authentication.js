import { combineResolvers } from 'graphql-resolvers'

import { verifyToken } from '../../authentication/token'

const tokenIsValid = (root, args, context, info) => {
    const token = context.authorization;
    if (!context.authorization) return new Error('Unauthenticated.');
    if (!verifyToken(context.authorization)) return new Error('Invalid authorization.');
}

export function wrapInTokenVerification(resolvers) {
    for (let resolver in resolvers) {
        if (typeof resolvers[resolver] === 'function') {
            resolvers[resolver] = combineResolvers(tokenIsValid, resolvers[resolver]);
        } else {
            resolvers[resolver] = wrapInTokenVerification(resolvers[resolver]);
        }
    }

    return resolvers;
}
