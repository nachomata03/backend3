import UsersModel from "./models/user.model.js";

export default class UsersDao {
    async getUsers() {
        return await UsersModel.find();
    }
    async getUser(id){
        return await UsersModel.findById(id);
    }

    async getUserByEmail(email) {
        return await UsersModel.findOne({ email: email });
    }

    async createUser(body){
        return await UsersModel.create(body);
    }
    async updateUser(id, body){
        return await UsersModel.updateOne({ _id: id }, { $set: body });
    }

    async updateUserPush(id, body){
        return await UsersModel.updateOne({ _id: id }, { $push: body });
    }
    async deleteUser(id){
        return await UsersModel.deleteOne({ _id: id });
    }
}