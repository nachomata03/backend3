import AdoptionModels from "./models/adoption.model.js";

export default class AdoptionDao {
    async getAdoptions() {
        return await AdoptionModels.find().populate('owner').populate('pet');
    }
    async getAdoption(id){
        return await AdoptionModels.findById(id).populate('owner').populate('pet');
    }

    async createAdoption(uid, pid){
        return await AdoptionModels.create({
        owner: uid,
        pet: pid
    });
    }
    async updateAdoption(id, body){
        return await AdoptionModels.updateOne({ _id: id }, { $set: body });
    }
    async deleteAdoption(id){
        return await AdoptionModels.deleteOne({ _id: id });
    }
}