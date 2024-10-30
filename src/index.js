// CommonJs
const express = require("express");
const cors = require("cors");

const { initDatabase } = require("./database/db");
const { usuariosRouter } = require("./module/tasks/users.router"); 
const { departamentoRouter } = require("./module/departments/department.router");
const { rolRouter } = require("./module/rols/roles.router");
const { activoRouter } = require("./module/assets(activos)/activos.router");
const { inventarioRouter } = require("./module/inventory/inventario.router");
const { prestamosRouter } = require("./module/loans/prestamos.router");
const { mantenimientosRouter } = require("./module/maintenances/mantenimientos.router");
const { reportesPrestamosRouter } = require("./module/loans/reportes_prestamos.router");
const { reservasRouter } = require("./module/reservation/reservas.router");

// Generar una aplicación
const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: "http://localhost:4200", // Permite solicitudes desde el puerto 4200 (frontend de Angular)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Inicializar los routers
app.use("/usuarios", usuariosRouter);
app.use("/departmentos", departamentoRouter);
app.use("/roles", rolRouter);
app.use("/activos", activoRouter);
app.use("/inventarios", inventarioRouter);
app.use("/prestamos", prestamosRouter);
app.use("/mantenimientos", mantenimientosRouter);
app.use("/reportes_prestamos", reportesPrestamosRouter);
app.use("/reservas", reservasRouter);

// Health check del servidor
app.get("/health-check", (req, res) => {
    res.send({
        msg: "Server running and up!!!"
    });
});

// Puerto de escucha
app.listen(3000, async () => {
    await initDatabase();
    console.log("Server running at port 3000");
});
