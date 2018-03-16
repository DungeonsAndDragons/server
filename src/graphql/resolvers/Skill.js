import { dbReference } from '../helpers/dbDirect'
import { SkillType } from "../propertyDefinitions";

export default {
    type: dbReference(SkillType, 'type')
}