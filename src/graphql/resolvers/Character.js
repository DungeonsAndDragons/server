import { dbReference } from '../helpers/dbDirect'
import { InventoryEntry, SavingThrow, Skill, Ability, Health, Money, SelectedSpell, Player } from "../propertyDefinitions";

export default {
    // classes: ..., TODO Implement classes

    savingThrows: dbReference(SavingThrow, 'id', 'character', false),
    skills: dbReference(Skill, 'id', 'character', false),
    abilities: dbReference(Ability, 'ability'),

    health: dbReference(Health, 'health'),

    money: dbReference(Money, 'money'),
    inventory: dbReference(InventoryEntry, 'id', 'character', false),
    spells: dbReference(SelectedSpell, 'id', 'character', false),

    player: dbReference(Player, 'player')
}
