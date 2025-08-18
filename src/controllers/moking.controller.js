import { mockingPets, mockingUsers } from "../utils/moking.js";
import { userService, petService } from "../services/index.js";

export default class MockingController{
    
    mockingPets = async(req, res) => {
        try{
            const pets = await mockingPets(50); 
            res.send({ status: 'success', payload: pets });
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    };
    mockingUsers = async(req, res) => {
        try{
            const users = await mockingUsers(50); 
            res.send({ status: 'success', payload: users });
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    };

    generateData = async(req, res) => {
        try{
            const pets = await mockingPets(50); 
            const users = await mockingUsers(50);

            await petService.createPet(pets);
            await userService.createUser(users);

            const payload = {
                pets: await petService.getPets(),
                users: await userService.getUsers()
            }
            res.send({ status: 'success', payload });
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }
}