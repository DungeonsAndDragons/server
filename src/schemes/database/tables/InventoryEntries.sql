CREATE TABLE InventoryEntries (
    id             INTEGER PRIMARY KEY,
    item           INTEGER, -- *TODO Add join into both Items and Equipment. Maybe merge those two tables into one*
    amount         INTEGER,
    totalWeight    INTEGER
);
