import { Router } from "express";
import userRouter from "./user.routes.js";
import petRouter from "./pet.routes.js";
import adoptionRouter from "./adoption.routes.js";
import mockingRouter from "./mocks.routes.js";

const indexRouter = Router();

indexRouter.use('/users', userRouter)

indexRouter.use('/pets', petRouter)

indexRouter.use('/adoptions', adoptionRouter)

indexRouter.use('/mocks', mockingRouter)

export default indexRouter;