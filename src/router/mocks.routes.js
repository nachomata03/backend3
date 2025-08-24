import { Router } from "express";
import MokingController from "../controllers/moking.controller.js";

const mokingController = new MokingController();
const router = Router();

router.get('/mockingpets/:pets', mokingController.mockingPets);

router.get('/mockingusers/:users', mokingController.mockingUsers);

router.post('/generateData', mokingController.generateData);

export default router;