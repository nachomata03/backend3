import AdoptionModels from "./models/adoption.model.js";

export default class AdoptionDao {
    async getUsers() {
        return await AdoptionModels.find();
    }
    async getUser(id){
        return await AdoptionModels.findById(id);
    }

    async createUser(body){
        return await AdoptionModels.create(body);
    }
    async updateUser(id, body){
        return await AdoptionModels.updateOne({ _id: id }, { $set: body });
    }
    async deleteUser(id){
        return await AdoptionModels.deleteOne({ _id: id });
    }
}