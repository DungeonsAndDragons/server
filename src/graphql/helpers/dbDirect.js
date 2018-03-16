import { database } from '../../db'
import { logger } from '../../log'

async function processProperties(parent, args, context, propertyMap, entry) {
    for (let property in propertyMap) {
        if (!propertyMap.hasOwnProperty(property)) continue;

        const propSettings = typeof propertyMap[property] === 'function'
                                ? propertyMap[property](parent, args, context, entry)
                                : propertyMap[property];
        if (!propSettings) continue;
        if (propSettings.protected)
            delete entry[property];
        if (propSettings.value)
            entry[property] = propSettings.value
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

    logger.debug("Executing: %s\t[ %s ]", sql, filterValues);

    return { sql, filterValues };
}

export function resolveToDB(propertyDefinition, filter, singleResult = false) {
    if (!filter) filter = {};

    const tableName = propertyDefinition.table;
    const propertyMap = propertyDefinition.propertyMap ? propertyDefinition.propertyMap : {};

    return async (parent, args, context) => {

        const resultProcessor = (result) => {
            if (typeof propertyDefinition.mapResult === 'function')
                result = propertyDefinition.mapResult(result);
            return processProperties(parent, args, context, propertyMap, result)
        };

        try {
            const db = await database;
            const { sql, filterValues } = buildSQL(tableName, filter, parent, args, context);
            if (singleResult) {
                const result = await db.get(sql, filterValues);
                return resultProcessor(result);
            } else {
                const results = await db.all(sql, filterValues);
                return results.map(resultProcessor);
            }
        } catch (err) {
            return err;
        }
    }
}

export function dbReference(propertyDefinition, parentProperty, childProperty = 'id', singleResult = true) {
    const filter = {};
    filter[childProperty] = (parent) => parent[parentProperty];

    return resolveToDB(propertyDefinition, filter, singleResult)
}