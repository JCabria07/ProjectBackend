const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const rolRouter = express.Router();

// Obtener todos los roles
rolRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM roles";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo rol
rolRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO roles (id, nombre) VALUES (null, ?)";
    await queryInsert(query, [body.nombre]);
    res.send({
        msg: "Rol creado con éxito"
    });
});

// Actualizar un rol por ID
rolRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE roles SET nombre = ? WHERE id = ?";
    await queryUpdate(query, [nombre, id]);
    res.send({
        msg: "Rol actualizado con éxito"
    });
});

// Eliminar un rol por ID
rolRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM roles WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Rol eliminado con éxito"
    });
});

module.exports = { rolRouter };
