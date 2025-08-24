import express from "express";
import indexRouter from "./router/index.routes.js";
import config from "./config/config.js";
import mongoose from 'mongoose';
import {errorHandle} from "./utils/errorManager.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT, MONGO_URI, STORAGE } = config;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

if( STORAGE === 'MONGO' ) {
    mongoose.connect(MONGO_URI, {
    dbName: "Backend3",
}).then(() => {
    console.log("Base de datos conectada");
}).catch((error) => {
    console.log(`Error al conectar a la base de datos ${error}`);
})
}else{
    mongoose.connect(MONGO_URI, {
    dbName: "Backend3",
}).then(() => {
    console.log("Base de datos conectada en mongo Compass");
}).catch((error) => {
    console.log(`Error al conectar a la base de datos ${error}`);
})
}


app.use('/api', indexRouter)

app.use(errorHandle);

export default app