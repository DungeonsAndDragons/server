import { sign, verify } from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'

import config from '../../config.json'

const secret = config.token.secret;

export function generateDevelopmentToken() {
    return sign({ id: 'superSpecificUserID' }, secret);
}

export function registerTokenResource(app) {
    app.use(bearerToken());
    app.get('/token', (req, res) => {
        // TODO Verify user details and do other stuff
        var token = sign({ id: 'superSpecificUserID' }, secret, { expiresIn: config.token.validityPeriod });
        res.send(token);
    })
}

export function verifyToken(token) {
    return verify(token, secret);
}
