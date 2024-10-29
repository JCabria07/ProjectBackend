const sqlite = require("sqlite3").verbose();
const urlDatabase = "database.db";

const ddl = `
    CREATE TABLE IF NOT EXISTS usuarios (
        identificacion INTEGER PRIMARY KEY,
        tipo_ID VARCHAR(10),
        nombre VARCHAR(50),
        correo VARCHAR(50) UNIQUE,
        contraseña VARCHAR(50),
        departamento_id INTEGER,
        rol_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS departamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(255),
        departamento_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS inventario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activo_id INTEGER NOT NULL,
        cantidad INTEGER,
        FOREIGN KEY (activo_id) REFERENCES activos(id)
    );

    CREATE TABLE IF NOT EXISTS prestamos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        activo_id INTEGER NOT NULL,
        fecha_prestamo DATE,
        fecha_devolucion DATE,
        estado VARCHAR(20),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion),
        FOREIGN KEY (activo_id) REFERENCES activos(id)
    );

    CREATE TABLE IF NOT EXISTS mantenimientos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activo_id INTEGER NOT NULL,
        fecha DATE,
        tipo VARCHAR(50),
        costo REAL,
        FOREIGN KEY (activo_id) REFERENCES activos(id)
    );

    CREATE TABLE IF NOT EXISTS reportes_prestamos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prestamo_id INTEGER NOT NULL,
        comentario TEXT,
        fecha_reporte DATE,
        FOREIGN KEY (prestamo_id) REFERENCES prestamos(id)
    );

    CREATE TABLE IF NOT EXISTS reservas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        activo_id INTEGER NOT NULL,
        fecha_reserva DATE,
        estado VARCHAR(20),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion),
        FOREIGN KEY (activo_id) REFERENCES activos(id)
    );
`;

const myDatabase = new sqlite.Database(urlDatabase);

const initDatabase = async () => {
    try {
        myDatabase.exec(ddl, (err) => {
            if (err) throw err;
            console.log("Database initialized successfully");
        });
    } catch (error) {
        console.error("Error during database initialization:", error);
    }
};

module.exports = { initDatabase, myDatabase };
