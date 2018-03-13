import fs from 'mz/fs'
import path from 'path'

function executeFilesInDirectory(db, directory) {
    const directoryListing = fs.readdirSync(directory);

    return Promise.all(directoryListing.map(async (file) => {
        const sqlStatement = await fs.readFile(path.join(directory, file), 'utf-8');
        return db.run(sqlStatement).catch((err) => {
            throw new Error(`Failed to execute '${directory}/${file}' - ${err.message}`)
        });
    }));
}

export async function initializeDatabase(db) {
    await executeFilesInDirectory(db, 'schemes/database/tables').catch(console.error);
    await executeFilesInDirectory(db, 'schemes/database/data').catch(console.error);
}
