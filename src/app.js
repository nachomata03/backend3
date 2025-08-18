import express from "express";
import indexRouter from "./router/index.routes.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = config;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use('/api', indexRouter)

export default app