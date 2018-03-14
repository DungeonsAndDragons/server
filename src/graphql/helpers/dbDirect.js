import { database } from '../../db'

async function processProperties(db, parent, args, context, propertyMap, entry) {
    for (let property in propertyMap) {
        if (!propertyMap.hasOwnProperty(property)) continue;

        const propSettings = typeof propertyMap[property] === 'function'
                                ? propertyMap[property](parent, args, context, entry)
                                : propertyMap[property];
        if (!propSettings) continue;
        if (propSettings.reference)
            entry[property] = await db.get(`SELECT * FROM ${propSettings.reference} WHERE id = ?`, entry[property]);
        if (propSettings.protected)
            delete entry[property];
    }

    return entry;
}

function buildSQL(tableName, filter, parent, args, context) {
    // Start off w/ basic SQL
    let sql = `SELECT * FROM ${tableName}`;
    let where = ' WHERE ';

    // Check if any filters are defined and if so, resolve their values
    let filterValues = [];
    if (Object.keys(filter).length) {

        let first = true;
        for (let property in filter) {
            if (!filter.hasOwnProperty(property)) continue;

            const value = typeof filter[property] === 'function'
                            ? filter[property](parent, args, context)
                            : filter[property];

            if (!value) continue;

            if (first) first = false;
            else where += ', ';

            where += `${property} = ?`;
            filterValues.push(value);
        }
    }

    if (filterValues.length > 0)
        sql += where;

    return { sql, filterValues };
}

export function resolveToDB(tableName, propertyMap, filter, singleResult = false) {
    if (!filter) filter = {};
    return async (parent, args, context) => {
        try {
            const db = await database;
            const { sql, filterValues } = buildSQL(tableName, filter, parent, args, context);
            if (singleResult) {
                const result = await db.get(sql, filterValues);
                return processProperties(db, parent, args, context, propertyMap, result);
            } else {
                const results = await db.all(sql, filterValues);
                return results.map((result) => processProperties(db, parent, args, context, propertyMap, result));
            }
        } catch (err) {
            return err;
        }
    }
}
