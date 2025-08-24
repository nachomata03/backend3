import { petService } from "../services/index.js";

export default class PetController {

    async getPets(req, res) {
        try{
            const result = await petService.getPets()
            res.json({status: 'success', response: result})
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
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
            res.json({status: 'success', response: result})
        }catch(error){
            next(error)
        }
    }
}