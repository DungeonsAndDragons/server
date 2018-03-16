import { resolveToDB } from '../helpers/dbDirect'
import { refreshToken } from '../../authentication/token'

import { Spell, Class, Item, Player, Character } from '../propertyDefinitions'

export default {
    refreshToken: (_, args, context) => refreshToken(context.authorization),
    spells: resolveToDB(Spell),
    classes: resolveToDB(Class),
    items: resolveToDB(Item),
    players: resolveToDB(Player),
    characters: resolveToDB(Character, {
        id: (_, args) => args.id
    })
};
