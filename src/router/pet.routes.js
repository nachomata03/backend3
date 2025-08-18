import { Router } from "express";
import PetController from "../controllers/pet.controller.js";

const router = Router();

const petController = new PetController();

router.get("/", petController.getPets);

router.get("/:id", petController.getPet);

router.post('/', petController.createPet);

router.put('/:id', petController.updatePet);

router.delete('/:id', petController.deletePet);

export default router;