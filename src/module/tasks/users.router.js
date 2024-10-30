const express = require("express");
const jwt = require("jsonwebtoken");
const { queryGet, queryInsert, queryUpdate, queryDelete } = require("../../database/query");
const { jwtSecret, jwtExpiresIn } = require("../../config");
const authMiddleware = require("../../Middleware/authMiddleware");
const bcrypt = require("bcrypt");
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
usuariosRouter.post("/", authMiddleware, async (req, res) => {
    const { identificacion, tipo_ID, nombre, correo, contraseña, departamento_id, rol_id } = req.body;
    const query = `
        INSERT INTO usuarios (identificacion, tipo_ID, nombre, correo, contraseña, departamento_id, rol_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10); // 10 es el número de rondas de sal

        await queryInsert(query, [identificacion, tipo_ID, nombre, correo, hashedPassword, departamento_id, rol_id]);
        res.send({ msg: "Usuario guardado con éxito" });
    } catch (error) {
        console.error(error); // Agrega un log para depuración
        res.status(500).send({ msg: "Error al guardar el usuario" });
    }
});

// Actualizar un usuario existente
usuariosRouter.put("/:identificacion", async (req, res) => {
    const { identificacion } = req.params;
    const { tipo_ID, nombre, correo, contraseña, departamento_id, rol_id } = req.body;

    let query = `
        UPDATE usuarios
        SET tipo_ID = ?, nombre = ?, correo = ?, departamento_id = ?, rol_id = ?
    `;
    const params = [tipo_ID, nombre, correo, departamento_id, rol_id];

    if (contraseña) {
        // Encriptar la nueva contraseña si se proporciona
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        query += ", contraseña = ?";
        params.push(hashedPassword);
    }

    query += " WHERE identificacion = ?";
    params.push(identificacion);

    try {
        await queryUpdate(query, params);
        res.send({ msg: "Usuario actualizado con éxito" });
    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar el usuario" });
    }
});

// Eliminar un usuario
usuariosRouter.delete("/:identificacion", authMiddleware, async (req, res) => {
    const { identificacion } = req.params;
    const query = "DELETE FROM usuarios WHERE identificacion = ?";
    try {
        await queryDelete(query, [identificacion]);
        res.send({ msg: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar el usuario" });
    }
});

// Ruta de login para autenticar y generar un token
usuariosRouter.post("/login", async (req, res) => {
    const { correo } = req.body;

    try {
        // Buscar usuario por correo
        const query = "SELECT * FROM usuarios WHERE correo = ?";
        const usuarios = await queryGet(query, [correo]);
        const usuario = usuarios[0];

        // Asegúrate de que el usuario existe
        if (!usuario) {
            return res.status(401).json({ msg: "Credenciales incorrectas" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { identificacion: usuario.identificacion, correo: usuario.correo },
            jwtSecret,
            { expiresIn: jwtExpiresIn }
        );

        res.status(200).json({ msg: "Autenticación exitosa", token });
    } catch (error) {
        console.error(error); // Agrega un log para depuración
        res.status(500).json({ msg: "Error de autenticación", error });
    }
});

module.exports = { usuariosRouter };
