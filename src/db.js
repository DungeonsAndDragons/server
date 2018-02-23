const sqlite3 = require('sqlite3').verbose();

let db = null;

export const connect = () => {
    if (db) {
        console.warn("Database already connected!");
        return
    }

    console.log("Connecting to database ...");

    db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
}
