import { dbReference } from '../helpers/dbDirect'
import { DiceThrow, Money } from "../propertyDefinitions";

export default {
    cost: dbReference(Money, 'cost'),
    damage: dbReference(DiceThrow, 'damage')
};
