import {logger} from "../config/logger.js";
import chalk from "chalk";

export const ListErrors = {
    ROUTING_ERROR: 404,        // Recurso no encontrado
    INVALID_TYPES_ERROR: 400,  // Datos inválidos
    DATABASE_ERROR: 500,       // Error interno del servidor
    AUTH_ERROR: 401,           // No autorizado
    INVALID_PARAM_ERROR: 422,  // Parámetros inválidos

    /*
        400 (Bad Request) → cuando el cliente manda algo mal.
        401 (Unauthorized) → falta autenticación.
        403 (Forbidden) → autenticado pero sin permisos.
        404 (Not Found) → recurso no existe.
        422 (Unprocessable Entity) → datos bien formados pero inválidos.
        500 (Internal Server Error) → algo falló en el servidor.
    */
};

export function errorHandle(error, req, res, next) {
    logger.info("Error capturado por el middleware:");
    let statusCode = error.code && typeof error.code === "number" ? error.code : 500;

    if (error) {
        logger.info("Error controlado:");
        logger.warn(`Mensaje: ${error.message}`);
        logger.warn(`Causa: ${JSON.stringify(error.cause, null, 2)}`);
        logger.error(`Stack trace: ${error.origin}`);
        res.setHeader("Content-Type", "application/json");

        return res.status(statusCode).json({
            status: "error",
            message: error.message,
            cause: error.cause || "No se proporcionó causa",
            origin: error.origin
        });
    }
}

export class CustomError extends Error {
    constructor(message, code = 500, cause = null) {
        super(message); // Herencia -> Es para el constructor del padre -> Error(message)
        this.code = code;
        this.cause = cause;
        
        Error.captureStackTrace(this, this.constructor);

        //separo el stack en lineas
        const stackLines = this.stack ? this.stack.split("\n") : [];
        this.origin = stackLines[1].trim() || "No disponible";
    }
}