import AdoptionDao from "./dao/adoption.dao.js";
export default class AdoptionRepository {
    constructor(){
        this.dao = new AdoptionDao();
    }
    async getAdoptions() {
        return await this.dao.getAdoptions();
    }
    async getAdoption(id){
        return await this.dao.getAdoption(id);
    }

    async createAdoption(body){
        return await this.dao.createAdoption(body);
    }
    async updateAdoption(id, body){
        return await this.dao.updateAdoption(id, body);
    }
    async deleteAdoption(id){
        return await this.dao.deleteAdoption(id);
    }
}