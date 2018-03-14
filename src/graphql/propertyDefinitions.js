export const Player = {
    table: 'Players',
    propertyMap: {
        password: { protected: true } //(parent, args, context, entry) => { protected: entry.id !== getPlayerID(context) }
    }
};

export const Character = {
    table: 'Characters',
    propertyMap: {
        health: { reference: 'Health' },
        money: { reference: 'Money' },
        // race: { reference: 'Races' },
        // subrace: { reference: 'Subraces'},
        player: { reference: 'Players' }
    }
};

export const Class = {
    table: 'Classes',
    propertyMap: {}
};

export const Item = {
    table: 'Items',
    propertyMap: {
        cost: { reference: 'Money' },
        damage: { reference: 'DiceThrows' }
    }
};

export const Spell = {
    table: 'Spells',
    propertyMap: {}
};
