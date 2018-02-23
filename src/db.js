import sqlite from 'sqlite'
import fs from 'fs-extra'
import path from 'path'

import config from '../config.json'

export const database = sqlite.open(config.database.url);

export const initializeDatabase = async () => {
    const db = await database;

    const tablesPath = path.join(__dirname, './schemes/database/tables');
    const directoryListing = await fs.readdir(tablesPath);

    const createPromises = Promise.all(directoryListing.map(async (tableFile) => {
        const createTableSQL = await fs.readFile(path.join(tablesPath, tableFile), 'utf-8');
        console.log(`Creating table ${tableFile} ...`);
        db.run(createTableSQL).catch((err) => {
            throw new Error(`Failed to create table ${tableFile} - ${err.message}`)
        });
    }));
}
