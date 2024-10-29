const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const inventarioRouter = express.Router();

// Obtener todos los inventarios
inventarioRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM inventario";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo inventario
inventarioRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO inventario (id, activo_id, cantidad) VALUES (null, ?, ?)";
    await queryInsert(query, [body.activo_id, body.cantidad]);
    res.send({
        msg: "Inventario creado con éxito"
    });
});

// Actualizar un inventario por ID
inventarioRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { activo_id, cantidad } = req.body;
    const query = "UPDATE inventario SET activo_id = ?, cantidad = ? WHERE id = ?";
    await queryUpdate(query, [activo_id, cantidad, id]);
    res.send({
        msg: "Inventario actualizado con éxito"
    });
});

// Eliminar un inventario por ID
inventarioRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM inventario WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Inventario eliminado con éxito"
    });
});

module.exports = { inventarioRouter };
