import { userService } from "../services/index.js";
import mongoose from "mongoose";
import { CustomError, ListErrors } from "../utils/errorManager.js";

export default class UserController {
    async getUsers(req, res) {
            try{
                const result = await userService.getUsers()
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
                res.json({status: 'success', response: result})
            }catch(error){
                next(error)
            }
        }    
}