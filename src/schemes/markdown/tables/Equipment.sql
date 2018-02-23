-- TODO This table may be merged with the Items table!
CREATE TABLE Equipment (
    id                 INTEGER PRIMARY KEY, -- *TODO This needs to be unique not only in this table but also across the Items table*
    name               TEXT,
    family             TEXT,
    category           TEXT,
    subcategory        TEXT,
    cost               INTEGER REFERENCES Money,
    weight             INTEGER,
    damage             INTEGER REFERENCES DiceThrow,
    damageType         TEXT,
    criticalMultiplier INTEGER,
    fullText           TEXT
);
