import fs from 'fs'
import sqlite from 'sqlite'
import { initializeDatabase } from '../src/dbInit'

const databaseFile = process.argv[2];

const unwind = (err) => {
    console.error(err);
    process.exit(1);
}

console.log(`schemes/database -> ${databaseFile}`)

if (fs.existsSync(databaseFile)) fs.unlinkSync(databaseFile);

sqlite.open(databaseFile).then(async (db) => {
    try {
        await initializeDatabase(db)
    } catch(err) {
        console.error("Failed to initialize database.");
        unwind(err);
    }
}).catch((err) => {
    console.error("Failed to open database.");
    unwind(err);
});
