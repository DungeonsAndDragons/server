import sqlite from 'sqlite'

import config from '../config.json'

export const database = sqlite.open(config.database.url);
