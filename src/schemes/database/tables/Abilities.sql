CREATE TABLE Abilities(
    id         INTEGER PRIMARY KEY,
    type       INTEGER,
    score      INTEGER,
    modifier   INTEGER,
    character  INTEGER REFERENCES Characters
);
