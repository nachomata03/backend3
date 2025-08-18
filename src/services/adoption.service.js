import AdoptionRepository from "../repository/adoption.repository.js";

export default class adoptionService {
    constructor(){
        this.adoptionRepostory = new AdoptionRepository();
    }
    async getAdoptions() {
            try{
                const result = await this.adoptionRepository.getAdoptions()
                return result
            } catch (error) {
                throw error
            }
        }
    
        async getAdoption(id) {
            try{
                const result = await this.adoptionRepository.getAdoption(id)
                return result
            } catch (error) {
                throw error
            }
        }

        async createAdoption(body) {
            try{
                const result = await this.adoptionRepository.createAdoption(body)
                return result
            } catch (error) {
                throw error
            }
        }

        async updateAdoption(id, body) {
            try{
                const result = await this.adoptionRepository.updateAdoption(id, body)
                return result
            } catch (error) {
                throw error
            }
        }

        async deleteAdoption(id) {
            try{
                const result = await this.adoptionRepository.deleteAdoption(id)
                return result
            } catch (error) {
                throw error
            }
        }
}