import UsersRepository from "../repository/user.repository.js";
import { createHash } from "../utils/utils.js";

export default class UserService {
    constructor(){
        this.userRepository = new UsersRepository();
    }
    async getUsers() {
            try{
                const result = await this.userRepository.getUsers()
                return result
            } catch (error) {
                throw error
            }
        }
    
        async getUser(id) {
            try{
                const result = await this.userRepository.getUser(id)
                return result
            } catch (error) {
                throw error
            }
        }

        async getUserByEmail(email){
            try{
                const result = await this.userRepository.getUserByEmail(email)
                return result
            } catch (error) {
                throw error
            }
        }

        async createUser(body) {
            try{
                if(Array.isArray(body)){
                    for (const user of body) {
                        const hased = await createHash(user.password)
                        user.password = hased
                    }
                }else{
                    const hased = await createHash(body.password)
                    body.password = hased
                }

                const result = await this.userRepository.createUser(body)
                return result
            } catch (error) {
                throw error
            }
        }

        async updateUser(id, body) {
            try{
                
                const result = await this.userRepository.updateUser(id, body)
                return result
            } catch (error) {
                throw error
            }
        }

        async deleteUser(id) {
            try{
                const result = await this.userRepository.deleteUser(id)
                return result
            } catch (error) {
                throw error
            }
        }
}