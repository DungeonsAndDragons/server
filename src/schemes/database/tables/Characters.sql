CREATE TABLE Characters(
    id                 INTEGER PRIMARY KEY,
    name               TEXT,
    experience         INTEGER, -- total amount of experience-points
    alignment          INTEGER,
    class              INTEGER REFERENCES Classes,
    proficiencyBonus   INTEGER,
    armorClass         INTEGER,
    initiative         INTEGER,
    speed              INTEGER,
    health             INTEGER REFERENCES Health,
    deathSaveSuccesses INTEGER,
    deathSaveFailures  INTEGER,
    traits             TEXT,
    ideals             TEXT,
    bonds              TEXT,
    flaws              TEXT,
    proficiencies      TEXT,
    features           TEXT,
    age                INTEGER,
    height             FLOAT,
    weight             INTEGER,
    eyes               TEXT,
    skin               TEXT,
    hair               TEXT,
    lore               TEXT,
    money              INTEGER REFERENCES Money,
    spells             *TODO*,
    player             INTEGER REFERENCES Players
);
