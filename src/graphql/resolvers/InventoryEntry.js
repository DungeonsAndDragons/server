import { dbReference } from '../helpers/dbDirect'
import { Item } from "../propertyDefinitions";

export default {
    item: dbReference(Item, 'item')
};
