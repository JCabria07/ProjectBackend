const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const reservasRouter = express.Router();

// Obtener todas las reservas
reservasRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM reservas";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear una nueva reserva
reservasRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO reservas (id, usuario_id, activo_id, fecha_reserva, estado) VALUES (null, ?, ?, ?, ?)";
    await queryInsert(query, [body.usuario_id, body.activo_id, body.fecha_reserva, body.estado]);
    res.send({
        msg: "Reserva creada con éxito"
    });
});

// Actualizar una reserva por ID
reservasRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { usuario_id, activo_id, fecha_reserva, estado } = req.body;
    const query = "UPDATE reservas SET usuario_id = ?, activo_id = ?, fecha_reserva = ?, estado = ? WHERE id = ?";
    await queryUpdate(query, [usuario_id, activo_id, fecha_reserva, estado, id]);
    res.send({
        msg: "Reserva actualizada con éxito"
    });
});

// Eliminar una reserva por ID
reservasRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM reservas WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Reserva eliminada con éxito"
    });
});

module.exports = { reservasRouter };
