import PetRepository from "../repository/pet.repository.js";
export default class PetController {
    constructor(){
        this.petRepository = new PetRepository();
    }
    async getPets() {
            try{
                const result = await this.petRepository.getPets()
                return result
            } catch (error) {
                throw error
            }
        }
    
        async getPet(id) {
            try{
                const result = await this.petRepository.getPet(id)
                return result
            } catch (error) {
                throw error
            }
        }

        async createPet(body) {
            try{
                const result = await this.petRepository.createPet(body)
                return result
            } catch (error) {
                throw error
            }
        }

        async updatePet(id, body) {
            try{
                const result = await this.petRepository.updatePet(id, body)
                return result
            } catch (error) {
                throw error
            }
        }

        async deletePet(id) {
            try{
                const result = await this.petRepository.deletePet(id)
                return result
            } catch (error) {
                throw error
            }
        }
}