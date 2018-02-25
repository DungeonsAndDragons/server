import { database } from '../../db'

export function resolveToDB(tableName, propertyMap) {
    return async (_, args, context) => {
        try {
            const db = await database;
            const results = await db.all(`SELECT * FROM ${tableName}`)

            return results.map(async (result) => {
                for (let property in propertyMap) {
                    if (!propertyMap.hasOwnProperty(property)) continue;
                    result[property] = await db.get(`SELECT * FROM ${propertyMap[property]} WHERE id = ?`, result[property]);
                }
                return result;
            });
        } catch (err) {
            return err;
        }
    }
}
