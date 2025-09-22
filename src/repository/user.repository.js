import UsersDao from "./dao/user.dao.js";
export default class UsersRepository {
    constructor(){
        this.dao = new UsersDao();
    }
    async getUsers() {
        return await this.dao.getUsers();
    }
    async getUser(id){
        return await this.dao.getUser(id);
    }

    async getUserByEmail(email){
        return await this.dao.getUserByEmail(email);
    }

    async createUser(body){
        return await this.dao.createUser(body);
    }
    async updateUser(id, body){
        return await this.dao.updateUser(id, body);
    }

    async updateUserPush(id, body){
        return await this.dao.updateUserPush(id, body);
    }
    async deleteUser(id){
        return await this.dao.deleteUser(id);
    }

}