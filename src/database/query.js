const { myDatabase } = require("./db");

const queryGet = (query = "", data = []) => {
    return new Promise((resolve, reject) => {
        myDatabase.all(query, data, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const queryInsert = (query = "", data = []) => {
    return new Promise((resolve, reject) => {
        myDatabase.run(query, data, (result, err) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

module.exports = { queryGet, queryInsert };