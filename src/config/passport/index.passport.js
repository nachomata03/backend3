import passport from "passport";
import { loginLocal, registerLocal } from "./localStrategy.js";
import jwt from "./jwtStrategy.js";

const initializePassport = () => {
    passport.use("register", registerLocal)
    passport.use("login", loginLocal)

    passport.use("jwt", jwt)
}

export default initializePassport;