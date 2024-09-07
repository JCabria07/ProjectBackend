const sqlite = require("sqlite3").verbose();
const urlDatabase = "database.db";

const ddl = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(255) UNIQUE NOT NULL
    )
`;

const myDatabase = new sqlite.Database(urlDatabase);

const initDatabase = async () => {
    try {
        myDatabase.run(ddl);
        console.log("Database init with success");
    } catch (error) {
        console.error("Error during initialization of database");
    }
};

module.exports = { initDatabase, myDatabase };