import { adoptionService } from "../services/index.js";

export default class AdoptionController {

    async getAdoptions(req, res) {
        try{
            const result = await adoptionService.getadoptions()
            res.json({status: 'success', response: result})
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
        }

    async getAdoption(req, res) {
        const id = req.params.id;
        try{
            const result = await adoptionService.getadoption(id)
            res.json({status: 'success', response: result})
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async createAdoption(req, res) {
        const body = req.body;
        try{
            const result = await adoptionService.createadoption(body)
            res.status(201).json({ status: 'success', response: result });
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }
}