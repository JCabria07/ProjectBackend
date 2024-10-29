// Es Modules
// import express from "express";

// CommonJs
const express = require("express");

const { initDatabase } = require("./database/db");

const { usuariosRouter } = require("./module/tasks/users.router"); // Importa el router de usuarios

const { departamentoRouter } = require("./module/departments/department.router");

const { rolRouter } = require("./module/rols/roles.router");

const { activoRouter } = require("./module/assets(activos)/activos.router");

const { inventarioRouter } = require("./module/inventory/inventario.router");

const { prestamosRouter } = require("./module/loans/prestamos.router");

const { mantenimientosRouter } = require("./module/maintenances/mantenimientos.router");

const { reportesPrestamosRouter } = require("./module/loans/reportes_prestamos.router");

const { reservasRouter } = require("./module/reservation/reservas.router");

// Generar una aplicación
const app = express();
app.use(express.json());

// Inicializar los routers
app.use("/usuarios", usuariosRouter); // Agrega el router 
app.use("/departmentos", departamentoRouter);
app.use("/roles", rolRouter);
app.use("/activos", activoRouter);
app.use("/inventarios", inventarioRouter);
app.use("/prestamos", prestamosRouter);
app.use("/mantenimientos", mantenimientosRouter);
app.use("/reportes_prestamos", reportesPrestamosRouter);
app.use("/reservas", reservasRouter);

// 2 parámetros: 1) La URL de acceso, 2) Handler, el manejador
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
