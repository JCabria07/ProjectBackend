// authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado. No se proporcionó token." });
    }

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified; // Agregar el payload del token al request
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
