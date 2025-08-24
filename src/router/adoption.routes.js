import { Router } from "express";
import AdoptionController from "../controllers/adoption.controller.js";

const adoptionController = new AdoptionController();

const router = Router();

router.get("/", adoptionController.getAdoptions);

router.get("/:id", adoptionController.getAdoption);

router.post('/', adoptionController.createAdoption);

export default router;