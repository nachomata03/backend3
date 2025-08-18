import { Router } from "express";

const indexRouter = Router();

indexRouter.use('/users', userRouter)

indexRouter.use('/pets', petRouter)

indexRouter.use('/adoptions', adoptionRouter)

indexRouter.use('/mocks', mockingRouter)

export default indexRouter;