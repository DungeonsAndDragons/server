import { resolveToDB } from '../helpers/dbDirect'
import { refreshToken } from '../../authentication/token'

import { Spell, Class, Item, Player, Character } from '../propertyDefinitions'

export default {
    refreshToken: (_, args, context) => refreshToken(context.authorization),
    spells: resolveToDB(Spell.table, Spell.propertyMap),
    classes: resolveToDB(Class.table, Class.propertyMap),
    items: resolveToDB(Item.table, Item.propertyMap),
    players: resolveToDB(Player.table, Player.propertyMap),
    characters: resolveToDB(Character.table, Character.propertyMap)
};
