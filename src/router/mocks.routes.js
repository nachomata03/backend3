import { Router } from "express";
import MokingController from "../controllers/mocking.controller.js";

const mokingController = new MokingController();
const router = Router();

router.get('/mockingpets', mokingController.mockingPets);

router.get('/mockingusers', mokingController.mockingUsers);

router.post('/generateData', mokingController.generateData);

export default router;