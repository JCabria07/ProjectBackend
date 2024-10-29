const express = require("express");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");

const usuariosRouter = express.Router();

// Obtener todos los usuarios
usuariosRouter.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM usuarios";
        const response = await queryGet(query);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ msg: "Error interno del servidor" });
    }
});

// Crear un nuevo usuario
usuariosRouter.post("/", async (req, res) => {
    const { identificacion, tipo_ID, nombre, correo, contraseña, departamento_id, rol_id } = req.body;
    const query = `
        INSERT INTO usuarios (identificacion, tipo_ID, nombre, correo, contraseña, departamento_id, rol_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        await queryInsert(query, [identificacion, tipo_ID, nombre, correo, contraseña, departamento_id, rol_id]);
        res.send({ msg: "Usuario guardado con éxito" });
    } catch (error) {
        res.status(500).send({ msg: "Error al guardar el usuario" });
    }
});

// Actualizar un usuario existente
usuariosRouter.put("/:identificacion", async (req, res) => {
    const { identificacion } = req.params;
    const { tipo_ID, nombre, correo, contraseña, departamento_id, rol_id } = req.body;
    const query = `
        UPDATE usuarios
        SET tipo_ID = ?, nombre = ?, correo = ?, contraseña = ?, departamento_id = ?, rol_id = ?
        WHERE identificacion = ?
    `;
    try {
        await queryUpdate(query, [tipo_ID, nombre, correo, contraseña, departamento_id, rol_id, identificacion]);
        res.send({ msg: "Usuario actualizado con éxito" });
    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar el usuario" });
    }
});

// Eliminar un usuario
usuariosRouter.delete("/:identificacion", async (req, res) => {
    const { identificacion } = req.params;
    const query = "DELETE FROM usuarios WHERE identificacion = ?";
    try {
        await queryDelete(query, [identificacion]);
        res.send({ msg: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar el usuario" });
    }
});

module.exports = { usuariosRouter };
