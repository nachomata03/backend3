import { petService } from "../services/index.js";
import { CustomError, ListErrors } from "../utils/errorManager.js";
import mongoose from "mongoose";

export default class PetController {

    async getPets(req, res, next) {
        try{
            const result = await petService.getPets()
            
            if(!result) throw new CustomError("No se encontraron mascotas", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se encontraron mascotas"})

            res.json({status: 'success', response: result})
        }catch(error){
            next(error)
        }
    }

    async getPet(req, res, next) {
        const id = req.params.id;
        try{
            if(!mongoose.Types.ObjectId.isValid(id)) {throw new CustomError(
                "El id debe ser de tipo string",
                ListErrors.INVALID_TYPES_ERROR,
                {   campo: "id", 
                    detalle: "El id debe ser de tipo string",
                }
            )}
            const result = await petService.getPet(id)

            if(!result) throw new CustomError("No se encontro la mascota", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se encontro la mascota"})

            res.json({status: 'success', response: result})
        }catch(error){
            next(error)
        }
    }

    async createPet(req, res, next) {
        const body = req.body;
        try{
            if(!body || Object.keys(body).length === 0 ) throw new CustomError(
                "El body no puede estar vacio", 
                ListErrors.INVALID_TYPES_ERROR, 
                {campo: "body", detalle: "El body no puede estar vacio"}
            )
            const result = await petService.createPet(body)

            if(!result) throw new CustomError("No se pudo crear la mascota", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo crear la mascota"})

            res.status(201).json({ status: 'success', response: result });
        }catch(error){
            next(error)
        }
    }

    async updatePet(req, res, next) {
        const id = req.params.id;
        const body = req.body;
        try{
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
            const result = await petService.updatePet(id, body)

            if(!result) throw new CustomError("No se pudo actualizar la mascota", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo actualizar la mascota"})

            res.json({ status: 'success', response: result });
        }catch(error){
            next(error)
        }
    }

    async deletePet(req, res, next) {
        const id = req.params.id;
        try{
            if(!mongoose.Types.ObjectId.isValid(id)) {throw new CustomError(
                "El id debe ser de tipo string",
                ListErrors.INVALID_TYPES_ERROR,
                {   campo: "id", 
                    detalle: "El id debe ser de tipo string",
                }
            )}
            const result = await petService.deletePet(id)

            if(!result) throw new CustomError("No se pudo eliminar la mascota", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo eliminar la mascota"})

            res.json({status: 'success', response: result})
        }catch(error){
            next(error)
        }
    }

    async createPetWithImage(req, res, next){
        const body = req.body;
        const file = req.file;

        try{
            if(!body || Object.keys(body).length === 0) throw new CustomError(
                "El body no puede estar vacio", 
                ListErrors.INVALID_TYPES_ERROR, 
                {campo: "body", detalle: "El body no puede estar vacio"}
            )
            if(!file) throw new CustomError("No se pudo subir la imagen", ListErrors.ROUTING_ERROR, {campo: "file", detalle: "No se pudo subir la imagen"})
            
            body.image = file.path
            console.log(body)
            const result = await petService.createPet(body)

            if(!result) throw new CustomError("No se pudo crear la mascota", ListErrors.ROUTING_ERROR, {campo: "result", detalle: "No se pudo crear la mascota"})

            res.status(201).json({ status: 'success', response: result });
        }catch(error){
            next(error)
        }
    }
}