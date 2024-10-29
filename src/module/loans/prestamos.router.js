const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const prestamosRouter = express.Router();

// Obtener todos los préstamos
prestamosRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM prestamos";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo préstamo
prestamosRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO prestamos (id, usuario_id, activo_id, fecha_prestamo, fecha_devolucion, estado) VALUES (null, ?, ?, ?, ?, ?)";
    await queryInsert(query, [body.usuario_id, body.activo_id, body.fecha_prestamo, body.fecha_devolucion, body.estado]);
    res.send({
        msg: "Préstamo creado con éxito"
    });
});

// Actualizar un préstamo por ID
prestamosRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { usuario_id, activo_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
    const query = "UPDATE prestamos SET usuario_id = ?, activo_id = ?, fecha_prestamo = ?, fecha_devolucion = ?, estado = ? WHERE id = ?";
    await queryUpdate(query, [usuario_id, activo_id, fecha_prestamo, fecha_devolucion, estado, id]);
    res.send({
        msg: "Préstamo actualizado con éxito"
    });
});

// Eliminar un préstamo por ID
prestamosRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM prestamos WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Préstamo eliminado con éxito"
    });
});

module.exports = { prestamosRouter };
