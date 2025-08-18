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

    async getPet(req, res) {
        const id = req.params.id;
        try{
            const result = await petService.getPet(id)
            res.json({status: 'success', response: result})
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async createPet(req, res) {
        const body = req.body;
        try{
            const result = await petService.createPet(body)
            res.status(201).json({ status: 'success', response: result });
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async updatePet(req, res) {
        const id = req.params.id;
        const body = req.body;
        try{
            const result = await petService.updatePet(id, body)
            res.json({ status: 'success', response: result });
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async deletePet(req, res) {
        const id = req.params.id;
        try{
            const result = await petService.deletePet(id)
            res.json({status: 'success', response: result})
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }
}