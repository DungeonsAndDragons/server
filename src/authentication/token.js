import { sign, verify } from 'jsonwebtoken'
import bearerToken from 'express-bearer-token'

import config from '../../config.json'
import { database } from '../db'

const secret = config.token.secret;

export function generateDevelopmentToken() {
    return sign({ id: 1 }, secret);
}

export function registerTokenResource(app) {
    app.use(bearerToken());
    app.get('/token', async (req, res) => {
        try {
            const db = await database;
            const { id, password } = await db.get('SELECT id, password FROM Players WHERE name = ?', req.query.username);

            if (password !== req.query.password) throw new Error("Invalid password");

            const token = sign({ id }, secret, { expiresIn: config.token.validityPeriod });
            res.send(token);
        } catch (err) {
            res.status(403);
            res.send("Unknown player or invalid password.");
        }
    })
}

export function verifyToken(token) {
    return verify(token, secret);
}
