import passport from "passport";
import jwt from "./passport/jwtStrategy.js";

const initializePassport = () => {
    passport.use("jwt", jwt)
};

export default initializePassport;