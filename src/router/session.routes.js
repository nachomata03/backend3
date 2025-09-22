import { Router } from "express";
import SessionController from "../controllers/session.controller.js";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = Router();

const sessionController = new SessionController();
const userController = new UserController();

router.get("/logout", sessionController.logOut);

router.post('/login', sessionController.loginUser);

router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ status: "success", user: req.user });
        console.log(req.user);
    }
);

router.post('/register', userController.createUser);

export default router;