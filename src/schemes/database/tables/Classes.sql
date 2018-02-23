CREATE TABLE Classes (
    id         INTEGER PRIMARY KEY,
    name       TEXT,
    type       TEXT,
    alignments INTEGER,
    hitDie     INTEGER, -- count of sides of the die
    fullText   TEXT
);
