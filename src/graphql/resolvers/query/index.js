import { resolveToDB } from '../dbDirect'

export const Query = {
    spells: resolveToDB('Spells'),
    classes: resolveToDB('Classes'),
    items: resolveToDB('Items', {
        cost: 'Money',
        damage: 'DiceThrows'
    }),
    // TODO Map Players
    // Especially challenging since they need to gain the field `characters`
    // and the field `password` needs to be hidden
};
