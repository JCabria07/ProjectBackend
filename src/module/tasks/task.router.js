// Router child

const express = require("express");
const { myDatabase } = require("./../../database/db");
const { queryGet, queryInsert } = require("../../database/query");

const taskRouter = express.Router();

// Aplicacion para la gestion de tareas
// CRUD

// const tasks = [];

taskRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM tasks";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// POST para crear
taskRouter.post("/", async (req, res) => {
    // Payload -> Carga util de la peticion
    const body = req.body;
    // PreparedStatementQuery
    const query = "INSERT INTO tasks (id, title, description) VALUES (null, ?, ?)";
    await queryInsert(query, [body.title, body.description]);
    // tasks.push(body);
    res.send({
        msg: "Saved with success"
    });
});

module.exports = { taskRouter };