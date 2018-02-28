import { sign, verify, decode } from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'

import config from '../../config.json'
import { database } from '../db'

const secret = config.token.secret;

export function generateDevelopmentToken() {
    return sign({ id: 1 }, secret);
}

export function createAndSignToken(userID) {
    return sign({ id: userID }, secret, { expiresIn: config.token.validityPeriod })
}

export async function generateToken(username, pwd) {
    try {
        const db = await database;
        const { id, password } = await db.get('SELECT id, password FROM Players WHERE name = ?', username);

        if (password !== pwd) throw new Error("Invalid password");

        return createAndSignToken(id);
    } catch (err) {
        return new Error("Unknown player or invalid password.")
    }
}

export function refreshToken(oldToken) {
    if (verifyToken(oldToken)) {
        return createAndSignToken(decode(oldToken).id);
    }
}

export function registerTokenResource(app) {
    app.use(bearerToken());
}

export function verifyToken(token) {
    return verify(token, secret);
}

export function getTokenData(token) {
    return decode(token);
}
