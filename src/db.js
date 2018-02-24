import sqlite from 'sqlite'
import fs from 'fs-extra'
import path from 'path'
import { initializeDatabase } from './dbInit'

import { logger as log } from './log'
import config from '../config.json'

export const dbURL = process.env.NODE_ENV === 'production' ? config.database.url : ':memory:';

export const database = sqlite.open(dbURL).catch((err) => {
    log.error('Failed to open database', err);
});

if (process.env.NODE_ENV !== 'production') {
    log.warn("Initializing memory DB ...");
    database.then((db) => {
        initializeDatabase(db).catch((err) => {
            log.error('Failed to create database', err);
        });
    });
}
