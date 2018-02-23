-- TODO This table may be merged with the Equipment table!
CREATE TABLE Items(
    id: INTEGER PRIMARY KEY, -- *TODO This needs to be unique not only in this table but also across the Equipment table*
    name: TEXT,
    category: TEXT,
    weight: INTEGER,
    specialAbility: TEXT,
    fullText: TEXT
);
