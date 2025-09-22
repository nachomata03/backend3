import { userService } from "../services/index.js";
import mongoose from "mongoose";
import { CustomError, ListErrors } from "../utils/errorManager.js";

export default class UserController {
    async getUsers(req, res) {
            try{
                const result = await userService.getUsers()

                if(!result) throw new CustomError("No se encontraron usuarios", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se encontraron usuarios"})

                res.json({status: 'success', response: result})
            } catch (error) {
                throw error
            }
        }
    
        async getUser(req, res, next) {
            const id = req.params.id;
            try{
                if(!mongoose.Types.ObjectId.isValid(id)) {throw new CustomError(
                    "El id debe ser de tipo string",
                    ListErrors.INVALID_TYPES_ERROR,
                    {   campo: "id", 
                        detalle: "El id debe ser de tipo string",
                    }
                )}
                const result = await userService.getUser(id)

                if(!result) throw new CustomError("No se encontro el usuario", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se encontro el usuario"}

                )
                res.json({status: 'success', response: result})
            } catch (error) {
                next(error)
            }
        }
    
        async createUser(req, res, next){
            const body = req.body;
            try{
                if(!body || Object.keys(body).length === 0 ) throw new CustomError(
                    "El body no puede estar vacio", 
                    ListErrors.INVALID_TYPES_ERROR, 
                    {campo: "body", detalle: "El body no puede estar vacio"}
                )
                const result = await userService.createUser(body)

                if(!result) throw new CustomError("No se pudo crear el usuario", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo crear el usuario"})

                res.status(201).json({ status: 'success', response: result });
            } catch (error) {
                next(error)
            }
        }
    
        async updateUser(req, res, next){
            const id = req.params.id;
            const body = req.body;
            try {
                if(!body || Object.keys(body).length === 0) throw new CustomError(
                    "El body no puede estar vacio", 
                    ListErrors.INVALID_TYPES_ERROR, 
                    {campo: "body", detalle: "El body no puede estar vacio"}
                )
                if(!mongoose.Types.ObjectId.isValid(id)) {throw new CustomError(
                    "El id debe ser de tipo string",
                    ListErrors.INVALID_TYPES_ERROR,
                    {   campo: "id", 
                        detalle: "El id debe ser de tipo string",
                    }
                )}
                const result = await userService.updateUser(id, body);

                if(!result) throw new CustomError("No se pudo actualizar el usuario", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo actualizar el usuario"})

                res.json({ status: 'success', response: result });
            } catch (error) {
                next(error)
            } 
        }
    
        async deleteUser(req, res, next){
            const id = req.params.id;
            try{
                if(!mongoose.Types.ObjectId.isValid(id)) {throw new CustomError(
                    "El id debe ser de tipo string",
                    ListErrors.INVALID_TYPES_ERROR,
                    {   campo: "id", 
                        detalle: "El id debe ser de tipo string",
                    }
                )}
                const result = await userService.deleteUser(id)

                if(!result) throw new CustomError("No se pudo eliminar el usuario", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo eliminar el usuario"})

                res.json({status: 'success', response: result})
            }catch(error){
                next(error)
            }
        }    
}