import PetsDao from "./dao/pet.dao.js";
export default class PetRepository {
    constructor(){
        this.dao = new PetsDao();
    }
    async getPets() {
        return await this.dao.getPets();
    }
    async getPet(id){
        return await this.dao.getPet(id);
    }

    async createPet(body){
        return await this.dao.createPet(body);
    }
    async updatePet(id, body){
        return await this.dao.updatePet(id, body);
    }
    async deletePet(id){
        return await this.dao.deletePet(id);
    }
    
}