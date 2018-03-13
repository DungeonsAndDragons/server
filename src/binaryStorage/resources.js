import config from '../../config.json'
import tmp from 'tmp'
import fs from 'mz/fs'
import path from 'path'
import { Magic, MAGIC_MIME_TYPE } from 'mmmagic'

import { logger } from '../log'

const magic = new Magic(MAGIC_MIME_TYPE);
const binaryStorageLocation = process.env.NODE_ENV === 'production' ? config.database.bin : createTemporaryDirectory();

function getMimeType(file) {
    return new Promise((resolve, reject) => {
        magic.detectFile(file, (err, mimeType) => {
            if (err) reject(err);
            else resolve(mimeType);
        })
    });
}

function createTemporaryDirectory() {
    const dir = tmp.dirSync();
    const temporaryAssetsPath = 'assets/dev/bin';
    const temporaryAssets = fs.readdirSync(temporaryAssetsPath);

    temporaryAssets.forEach((asset) => {
        const origin = path.join(temporaryAssetsPath, asset);
        const dest = path.join(dir.name, asset);

        fs.copyFile(origin, dest).catch((err) => {
            logger.error("Failed to copy temporary asset. %s", err)
        })
    });

    tmp.setGracefulCleanup();

    return dir.name
}

export function serveBinaryResources(app) {
    app.use('/bin/:id', async (req, res) => {
        const id = req.params.id;
        const filePath = path.join(binaryStorageLocation, id);
        const exists = await fs.exists(filePath);

        if (!exists) {
            res.status(404);
            res.send('File not found.');
        } else {
            try {
                res.setHeader("Content-Type", await getMimeType(filePath));
            } catch (err) {
                logger.debug("Unable to determine mime-type.", err);
            }

            res.send(await fs.readFile(filePath));
        }
    });
}