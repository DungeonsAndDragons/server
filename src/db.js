import sqlite from 'sqlite'
import fs from 'fs-extra'
import path from 'path'

import config from '../config.json'

export const database = sqlite.open(config.database.url);

export const initializeDatabase = async () => {
    const db = await database;
    const directoryListing = await fs.readdir(config.database.tables);

    const createPromises = Promise.all(directoryListing.map(async (tableFile) => {
        const createTableSQL = await fs.readFile(path.join(config.database.tables, tableFile), 'utf-8');
        console.log(`Creating table ${tableFile} ...`);
        db.run(createTableSQL).catch((err) => {
            throw new Error(`Failed to create table ${tableFile} - ${err.message}`)
        });
    }));
}
