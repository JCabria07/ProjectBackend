# Proyecto de Gestión de Activos

Este proyecto se basa en un repositorio de GitHub clonado (https://github.com/Cbermudez98/web_backend_5to - Créditos al profe César), el cual fue modificado para implementar un sistema de gestión de activos del área de sistemas. A continuación se describen las principales características y funcionalidades añadidas.

## Características

- **Autenticación con JWT**: Se implementó un sistema de autenticación utilizando JSON Web Tokens (JWT) para asegurar las rutas del API.
- **Middleware de Autenticación**: Se añadió un middleware que valida el token JWT para proteger las rutas sensibles del sistema.
- **Gestión de Usuarios**: Se creó un módulo para gestionar los usuarios, incluyendo operaciones como crear, actualizar, eliminar y obtener usuarios.
- **Base de Datos SQLite**: Se configuró una base de datos SQLite para almacenar la información de los usuarios y activos.
- **Rutas Protegidas**: Se implementaron rutas protegidas que requieren autenticación para acceder a información sensible.
