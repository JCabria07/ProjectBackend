const { myDatabase } = require("./db");

const queryGet = (query = "", data = []) => {
    return new Promise((resolve, reject) => {
        myDatabase.all(query, data, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const queryInsert = (query = "", data = []) => {
    return new Promise((resolve, reject) => {
        myDatabase.run(query, data, function (err) {
            if (err) reject(err);
            resolve({ message: "Record inserted successfully", lastID: this.lastID });
        });
    });
};

const queryUpdate = (query = "", data = []) => {
    return new Promise((resolve, reject) => {
        myDatabase.run(query, data, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Record updated successfully", changes: this.changes });
            }
        });
    });
};

const queryDelete = (query = "", data = []) => {
    return new Promise((resolve, reject) => {
        myDatabase.run(query, data, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Record deleted successfully", changes: this.changes });
            }
        });
    });
};

module.exports = { queryGet, queryInsert, queryUpdate, queryDelete };
