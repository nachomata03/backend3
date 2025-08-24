import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,       // Colores en la consola
            translateTime: 'yyyy-mm-dd HH:MM:ss.l', // formato de fecha
            ignore: "pid,hostname" // Ocultar campos que no necesitas
        }
    }
});

export default logger;