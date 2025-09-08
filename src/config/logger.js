import winston from "winston";
import config from "./config.js";
import chalk from "chalk";


const transportConsole = new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
            let coloredMessage = message;
            if (level === "info") coloredMessage = chalk.cyan(message);
            if (level === "warn") coloredMessage = chalk.yellow(message);
            if (level === "error") coloredMessage = chalk.red(message);
            return `[${timestamp} ${level.toUpperCase()}] ${coloredMessage}`;
        })
    )
});

// Transporte para archivo de errores
const transportFileError = new winston.transports.File({
    level: "error",
    filename: "./src/logs/error.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});


// Crear instancia del logger
export const logger = winston.createLogger({
    level: "info", // nivel por defecto
    transports: config.MODE === "dev" ? [transportConsole] : [transportFileError],
});


// Middleware para inyectar logger en cada request
export const middLogg = (req, res, next) => {
    req.logger = logger;
    next();
};
