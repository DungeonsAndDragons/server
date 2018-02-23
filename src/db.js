import sqlite3 from 'sqlite3'

import config from '../config.json'

let db = null;

export const connect = () => {
    if (db) {
        console.warn("Database already connected!");
        return
    }

    console.log("Connecting to database ...");

    db = new sqlite3.Database(config.database.url, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Connected to SQlite database at '${config.database.url}'.`);
    });
}

export const disconnect = () => {
    return new Promise((resolve, reject) => {
        db.close((err) => {
          if (err) reject(err)
          else resolve('Closed the database connection.');
        });
    });
}
