const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const activoRouter = express.Router();

// Obtener todos los activos
activoRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM activos";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo activo
activoRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO activos (id, nombre, descripcion, departamento_id) VALUES (null, ?, ?, ?)";
    await queryInsert(query, [body.nombre, body.descripcion, body.departamento_id]);
    res.send({
        msg: "Activo creado con éxito"
    });
});

// Actualizar un activo por ID
activoRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, departamento_id } = req.body;
    const query = "UPDATE activos SET nombre = ?, descripcion = ?, departamento_id = ? WHERE id = ?";
    await queryUpdate(query, [nombre, descripcion, departamento_id, id]);
    res.send({
        msg: "Activo actualizado con éxito"
    });
});

// Eliminar un activo por ID
activoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM activos WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Activo eliminado con éxito"
    });
});

module.exports = { activoRouter };
