import {getPlayerID} from "./helpers/authentication";

export const Money = {
    table: 'Money'
};

export const DiceThrow = {
    table: 'DiceThrows'
};

export const SavingThrow = {
    table: 'SavingThrows'
};

export const SkillType = {
    table: 'SkillTypes'
};

export const Skill = {
    table: 'Skills'
};

export const Ability = {
    table: 'Abilities'
};

export const Health = {
    table: 'Health'
};

export const Player = {
    table: 'Players',
    propertyMap: {
        password: { protected: true }
    }
};

export const Character = {
    table: 'Characters',
    propertyMap: {
        notes: (parent, args, context, entry) => ({
            protected: entry.player !== getPlayerID(context)
        })
    }
};

export const Class = {
    table: 'Classes'
};

export const Item = {
    table: 'Items'
};

export const InventoryEntry = {
    table: 'InventoryEntries'
};

export const Spell = {
    table: 'Spells'
};

export const SelectedSpell = {
    table: 'SelectedSpells'
};