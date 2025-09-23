import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { uploader } from "../utils/multer.js";

const userController = new UserController();

const router = Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post("/:id/documents", uploader.array("documents"), userController.uploadDocuments)

export default router;