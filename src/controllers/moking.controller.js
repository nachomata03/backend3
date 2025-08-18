import { generateMockPets, generateMockUsers } from "../utils/moking.js";

export default class MockingController{
    
    mockingPets = async(req, res) => {
        const pets = generateMockPets(50); 
        res.send({ status: 'success', payload: pets });
    };
    mockingUsers = async(req, res) => {
        const users = await generateMockUsers(50);
        res.send({ status: 'success', payload: users });
    };

    generateData = async(req, res) => {
        const {users = 0, pets = 0} = req.body;
        const usersGenerated = await generateMockUsers(users);
        const petsGenerated = generateMockPets(pets);
        res.send({ status: 'success', payload: {usersGenerated, petsGenerated}});
    }
}