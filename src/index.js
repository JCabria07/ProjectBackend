// Es Modules
// import express from "express";

// CommonJs
const express = require("express");

const { initDatabase } = require("./database/db");

const { taskRouter } = require("./module/tasks/task.router");

// Generar una aplicacion
const app = express();
app.use(express.json());

// Lo inicializo en mi app
app.use("/tasks", taskRouter);

// 2 parametros 1) La url de acceso, 2) handler el manejador
app.get("/health-check", (req, res) => {
    res.send({
        msg: "Server running and up!!!"
    });
});

// PORT -> 3000 -> 4000 -> 8000 -> 8080
app.listen(3000, async () => {
    await initDatabase();
    console.log("Server running at port 3000");
});