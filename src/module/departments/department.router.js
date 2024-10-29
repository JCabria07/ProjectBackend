const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const departamentoRouter = express.Router();

// Obtener todos los departamentos
departamentoRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM departamentos";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error"
        });
    }
});

// Crear un nuevo departamento
departamentoRouter.post("/", async (req, res) => {
    const body = req.body;
    const query = "INSERT INTO departamentos (id, nombre) VALUES (null, ?)";
    await queryInsert(query, [body.nombre]);
    res.send({
        msg: "Departamento creado con éxito"
    });
});

// Actualizar un departamento por ID
departamentoRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE departamentos SET nombre = ? WHERE id = ?";
    await queryUpdate(query, [nombre, id]);
    res.send({
        msg: "Departamento actualizado con éxito"
    });
});

// Eliminar un departamento por ID
departamentoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM departamentos WHERE id = ?";
    await queryDelete(query, [id]);
    res.send({
        msg: "Departamento eliminado con éxito"
    });
});

module.exports = { departamentoRouter };
