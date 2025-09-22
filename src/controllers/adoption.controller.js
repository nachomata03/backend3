import { adoptionService } from "../services/index.js";
import { CustomError, ListErrors } from "../utils/errorManager.js";
import mongoose from "mongoose";

export default class AdoptionController {

    async getAdoptions(req, res, next) {
        try{
            const result = await adoptionService.getAdoptions()
            if(!result){
                throw new CustomError(
                    "No se encontraron adopciones",
                    ListErrors.ROUTING_ERROR,
                    {   campo: "result", 
                        detalle: "No se encontraron adopciones",
                    }
                )
            }
            res.json({status: 'success', response: result})
        }catch(error){
            next(error)
        }
        }

    async getAdoption(req, res, next) {
        const id = req.params.id;
        try{
            if(!mongoose.Types.ObjectId.isValid(id)) {throw new CustomError(
                "El id debe ser de tipo string",
                ListErrors.INVALID_TYPES_ERROR,
                {   campo: "id", 
                    detalle: "El id debe ser de tipo string",
                }
            )}

            const result = await adoptionService.getAdoption(id)
            if(!result){
                throw new CustomError(
                    "No se encontro la adopcion",
                    ListErrors.ROUTING_ERROR,
                    {   campo: "result", 
                        detalle: "No se encontraron adopciones",
                    }
                )
            }
            res.json({status: 'success', response: result})
        }catch(error){
            next(error)
        }
    }

    async createAdoption(req, res, next) {
        const uid = req.user._id;
        const pid = req.params.pid;
        try{
            if(!mongoose.Types.ObjectId.isValid(pid)) {throw new CustomError(
                "El id debe ser de tipo string",
                ListErrors.INVALID_TYPES_ERROR,
                {   campo: "id", 
                    detalle: "El id debe ser de tipo string",
                }
            )}

            if(!mongoose.Types.ObjectId.isValid(uid)) {throw new CustomError(
                "El id debe ser de tipo string",
                ListErrors.INVALID_TYPES_ERROR,
                {   campo: "id", 
                    detalle: "El id debe ser de tipo string",
                }
            )}

            const result = await adoptionService.createAdoption(uid, pid)

            if(!result){
                throw new CustomError(
                    "No se pudo crear la adopcion",
                    ListErrors.ROUTING_ERROR,
                    {   campo: "result", 
                        detalle: "No se pudo crear la adopcion",
                    }
                )
            }
            res.status(201).json({ status: 'success', response: result });
        }catch(error){
            next(error)
        }
    }
}