import { isValidPassword } from "../utils/utils.js";
import { logger } from "../config/logger.js";
import { userService } from "../services/index.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { CustomError, ListErrors } from "../utils/errorManager.js";

const {JWT_SECRET} = config

export default class SessionController {

    async logOut(req, res) {
        logger.info(`El usuario ${req.user.email} se ha deslogueado`);
        await userService.updateUser(req.user.id, {last_connection: new Date()});
        res.clearCookie('access_token');
        res.redirect('/api/sessions/login');
    }

    async loginUser(req, res, next){
        try{
            const {email, password} = req.body;

            const user = await userService.getUserByEmail(email);
            if(!user){
                throw new CustomError(
                    "El usuario no existe", 
                    ListErrors.ROUTING_ERROR, 
                    { 
                        campo: "email",
                        detalle: "El usuario no existe",   
                    }
                )
            } 
                

            const passwordOK = await isValidPassword(user, password);
            if(!passwordOK) {
                throw new CustomError(
                    "La contraseña es incorrecta", 
                    ListErrors.ROUTING_ERROR, 
                    { 
                        campo: "password",
                        detalle: "La contraseña es incorrecta",   
                    }
                )
            }
            
            user.last_connection = new Date();

            await userService.updateUser(user._id, user);

            const token = await jwt.sign(
                {id: user._id, email: user.email, role: user.role},
                JWT_SECRET,
                {expiresIn: '24h'}
            )

            logger.info(`El usuario ${user.email} se ha logueado`)

            res.cookie('access_token', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); //24h
            res.redirect('/api/sessions/adoptions');
        }catch(err){
            next(err)
        }
    }

}