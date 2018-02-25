import { resolveToDB } from '../helpers/dbDirect'
import { Character } from '../propertyDefinitions'

export default {
    characters: resolveToDB(Character.table, Character.propertyMap, {
        player: (parent, args, context) => parent.id
    })
};
