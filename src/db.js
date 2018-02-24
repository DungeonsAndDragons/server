import sqlite from 'sqlite'
import fs from 'fs-extra'
import path from 'path'
import { initializeDatabase } from './dbInit'

import config from '../config.json'

export const dbURL = process.env.NODE_ENV === 'production' ? config.database.url : ':memory:';

export const database = sqlite.open(dbURL).catch((err) => {
    console.error("Failed to open database");
    console.error(err);
    process.exit(1);
});

if (process.env.NODE_ENV !== 'production') {
    console.warn("Not running in production. Initializing memory DB ...");
    database.then((db) => {
        initializeDatabase(db).catch((err) => {
            console.error("Failed to create database!");
            console.error(err);
            process.exit(1);
        });
    });
}
