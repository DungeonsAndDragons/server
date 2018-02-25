import { resolveToDB } from '../helpers/dbDirect'

import { Spell, Class, Item, Player } from '../propertyDefinitions'

export default {
    spells: resolveToDB(Spell.table, Spell.propertyMap),
    classes: resolveToDB(Class.table, Class.propertyMap),
    items: resolveToDB(Item.table, Item.propertyMap),
    players: resolveToDB(Player.table, Player.propertyMap)
};
