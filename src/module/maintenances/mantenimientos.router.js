const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const mantenimientosRouter = express.Router();

// Obtener todos los mantenimientos
mantenimientosRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM mantenimientos";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo mantenimiento
mantenimientosRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO mantenimientos (id, activo_id, fecha, tipo, costo) VALUES (null, ?, ?, ?, ?)";
    await queryInsert(query, [body.activo_id, body.fecha, body.tipo, body.costo]);
    res.send({
        msg: "Mantenimiento creado con éxito"
    });
});

// Actualizar un mantenimiento por ID
mantenimientosRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { activo_id, fecha, tipo, costo } = req.body;
    const query = "UPDATE mantenimientos SET activo_id = ?, fecha = ?, tipo = ?, costo = ? WHERE id = ?";
    await queryUpdate(query, [activo_id, fecha, tipo, costo, id]);
    res.send({
        msg: "Mantenimiento actualizado con éxito"
    });
});

// Eliminar un mantenimiento por ID
mantenimientosRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM mantenimientos WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Mantenimiento eliminado con éxito"
    });
});

module.exports = { mantenimientosRouter };
