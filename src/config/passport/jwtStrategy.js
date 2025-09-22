import config from "../config.js";
import passportJwt from "passport-jwt";
import { logger } from "../logger.js";
import { CustomError, ListErrors } from "../../utils/errorManager.js";  
import { userService } from "../../services/index.js";

const {JWT_SECRET} = config

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
} 

async function verifyJwt(jwt_payload, done) {
    try{
        logger.info("Verificando token...")

        const user = await userService.getUser(jwt_payload.id)

        if (!user) {
            const error = new CustomError(
                "El usuario no existe", 
                ListErrors.NOT_FOUND_ERROR, 
                { 
                    campo: "email",
                    detalle: "El usuario no existe",   
                })
                
            logger.warn(`Error de autenticación: ${error.message}`);
            return done(error, false);
        }

        logger.info(`Usuario autenticado: ${user.email}`);

        return done(null, user)
    }catch(err){
        const error = new CustomError(
            "Error al verificar el token",
            ListErrors.DATABASE_ERROR,
            { cause: err.message }
        );
        logger.error(`Error en verifyJwt: ${error.message}`);
        return done(error, false);
    }
}

const jwt = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET
}, verifyJwt)

export default jwt