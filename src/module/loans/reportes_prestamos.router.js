const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const reportesPrestamosRouter = express.Router();

// Obtener todos los reportes de préstamos
reportesPrestamosRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM reportes_prestamos";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo reporte de préstamo
reportesPrestamosRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO reportes_prestamos (id, prestamo_id, comentario, fecha_reporte) VALUES (null, ?, ?, ?)";
    await queryInsert(query, [body.prestamo_id, body.comentario, body.fecha_reporte]);
    res.send({
        msg: "Reporte de préstamo creado con éxito"
    });
});

// Actualizar un reporte de préstamo por ID
reportesPrestamosRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { prestamo_id, comentario, fecha_reporte } = req.body;
    const query = "UPDATE reportes_prestamos SET prestamo_id = ?, comentario = ?, fecha_reporte = ? WHERE id = ?";
    await queryUpdate(query, [prestamo_id, comentario, fecha_reporte, id]);
    res.send({
        msg: "Reporte de préstamo actualizado con éxito"
    });
});

// Eliminar un reporte de préstamo por ID
reportesPrestamosRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM reportes_prestamos WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Reporte de préstamo eliminado con éxito"
    });
});

module.exports = { reportesPrestamosRouter };
