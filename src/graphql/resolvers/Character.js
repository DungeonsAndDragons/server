import { resolveToDB } from '../helpers/dbDirect'
import { Player } from '../propertyDefinitions'

export default {
    player: resolveToDB(Player.table, Player.propertyMap, {
        id: (parent, args, context) => parent.player
    }, true)
}
