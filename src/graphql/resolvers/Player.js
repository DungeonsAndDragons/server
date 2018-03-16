import { dbReference } from '../helpers/dbDirect'
import { Character } from '../propertyDefinitions'

export default {
    characters: dbReference(Character, 'id', 'player', false)
};
