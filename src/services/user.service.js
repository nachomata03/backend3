import UsersRepository from "../repository/user.repository.js";

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

        async createUser(body) {
            try{
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