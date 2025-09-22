import AdoptionRepository from "../repository/adoption.repository.js";
import UsersRepository from "../repository/user.repository.js";
import PetRepository from "../repository/pet.repository.js";

export default class AdoptionService {
    constructor(){
        this.adoptionRepostory = new AdoptionRepository();
        this.userRepository = new UsersRepository();
        this.petRepository = new PetRepository();
    }
    async getAdoptions() {
            try{
                const result = await this.adoptionRepostory.getAdoptions()
                return result
            } catch (error) {
                throw error
            }
        }
    
        async getAdoption(id) {
            try{
                const result = await this.adoptionRepostory.getAdoption(id)
                return result
            } catch (error) {
                throw error
            }
        }

        async createAdoption(uid, pid) {
            try{
                const user = await this.userRepository.getUser(uid);
                if(!user){
                    throw new error;
                }
                
                const pet = await this.petRepository.getPet(pid);
                if(!pet){
                    throw new error;
                }

                const result = await this.adoptionRepostory.createAdoption(user._id, pet._id)

                const petUpdate = await this.petRepository.updatePet(pid, {adopted: true, owner: uid})
                const userUpdate = await this.userRepository.updateUserPush(uid, {pets: pet._id})
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