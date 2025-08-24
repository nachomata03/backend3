import { Strategy } from "passport-local";
import { createHash, isValidPassword } from "../../utils.js";
import {generateToken} from "../../utils.js"
import {userService} from "../../services/index.js"

async function verifyRegister (req, username, password, done) {
    const user = {...req.body}
    try {
        const emailExistente = await userService.getUserByEmail({email: username})
        if (emailExistente) {
            return done(null, false, {message: 'El usuario ya existe'})
        }

        const user = {
            ...user,
            password: await createHash(password)
        }
        const result = await userService.createUser(user)
        return done(null, result)

    } catch (error) {
        console.log(error)
        return done(error)
    }
}

async function verifyLogin (username, password, done){
    try{
        const user = await UserModel.findOne({email: username})
        if(!user) return done(null, false, {message: 'Credenciales incorrectas'})
        const passwordOk = await isValidPassword(user, password)
        if(!passwordOk) return done(null, false, {message: 'Credenciales incorrectas'})

        const payload = new userDto(user)
        const token = await generateToken(payload)
        if(!token) return done(null, false, {message: 'No se pudo generar el token'})
        return done(null, token)
    }catch(error){
        console.log(error)
        return done(error)
    }
}



const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);

const loginLocal = new Strategy({usernameField: "email"}, verifyLogin);

export {registerLocal, loginLocal} 