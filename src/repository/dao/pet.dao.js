import PetsModel from "../models/pet.model.js";

export default class PetsDao {
    async getPets() {
        return await PetsModel.find();
    }
    async getPet(id){
        return await PetsModel.findById(id);
    }

    async createPet(body){
        return await PetsModel.create(body);
    }
    async updatePet(id, body){
        return await PetsModel.updateOne({ _id: id }, { $set: body });
    }
    async deletePet(id){
        return await PetsModel.deleteOne({ _id: id });
    }
}