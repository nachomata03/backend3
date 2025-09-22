import { Router } from "express";
import AdoptionController from "../controllers/adoption.controller.js";
import passport from "passport";

const adoptionController = new AdoptionController();

const router = Router();

router.get("/", adoptionController.getAdoptions);

router.get("/:id", adoptionController.getAdoption);

router.post('/:pid', passport.authenticate("jwt", { session: false }), adoptionController.createAdoption);

export default router;