import express from "express";
import indexRouter from "./router/index.routes.js";
import config from "./config/config.js";
import mongoose from 'mongoose';
import { errorHandle } from "./utils/errorManager.js"
import cluster from "cluster";
import os from "os";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import path from "path";
import { fileURLToPath } from 'url';

import cors from "cors";

import passport from "passport";
import initializePassport from "./config/index.js";

import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT, MONGO_URI, STORAGE } = config;


if (STORAGE === 'MONGO') {
    mongoose.connect(MONGO_URI, {
        dbName: "Backend3",
    }).then(() => {
        console.log("Base de datos conectada");
    }).catch((error) => {
        console.log(`Error al conectar a la base de datos ${error}`);
    })
} else {
    mongoose.connect(MONGO_URI, {
        dbName: "Backend3",
    }).then(() => {
        console.log("Base de datos conectada en mongo Compass");
    }).catch((error) => {
        console.log(`Error al conectar a la base de datos ${error}`);
    })
}

const TotalCPUs = os.cpus().length;
const numCPUs = TotalCPUs - 10;

/* if (cluster.isPrimary) { //no levanta el servidor la primera vez
    console.log(`Proceso primario PID ${process.pid} | CPUs disponibles: ${TotalCPUs}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    console.log("holaaaaa")

    cluster.on("disconnect", (worker) => {
        console.log(
            `Worker PID ${worker.process.pid} (ID: ${worker.id}) desconectado. Creando nuevo worker...`
        );
        cluster.fork();
    });

} else {
    app.listen(PORT, () => {
        console.log(
            `Worker (process) PID ${process.pid} (ID: ${cluster.worker.id}) escuchando en puerto http://localhost:${PORT}`
        );
    });
}  */

    app.listen(PORT, () => {
    console.log(`Servidor de desarrollo escuchando en puerto http://localhost:${PORT}`);
});

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion API",
            description: "Documentacion API",
            version: "1.0.0"
        },
        servers: [
        {
            url: "http://localhost:8080",
            description: "Production server"
        },
        {
            url: "http://localhost:5000",
            description: "Development server"
        }
    ],
    },
    apis: [path.join(__dirname, "./docs/*.yaml")]
}


const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use('/api', indexRouter)

app.use(errorHandle);

export default app