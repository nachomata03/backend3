import { mockingPets, mockingUsers } from "../utils/moking.js";
import { userService, petService } from "../services/index.js";
import { CustomError, ListErrors } from "../utils/errorManager.js";

export default class MockingController{
    
    mockingPets = async(req, res, next) => {
        const pets = req.params.pets
        try{
            if(isNaN(pets))
                throw new CustomError(
                    "El query debe ser de tipo number",
                    ListErrors.INVALID_TYPES_ERROR,
                    {   campo: "query", 
                        detalle: "El query debe ser de tipo number",
                    }
                )
            
            const payload = await mockingPets(pets); 
            res.send({ status: 'success', payload});
        }catch(error){
            next(error)
        }
    };

    mockingUsers = async(req, res, next) => {
        const users = req.params.users
        try{
            if(isNaN(users))
                throw new CustomError(
                    "El query debe ser de tipo number",
                    ListErrors.INVALID_TYPES_ERROR,
                    {   campo: "query", 
                        detalle: "El query debe ser de tipo number",
                    }
                )
            const payload = await mockingUsers(users); 
            res.send({ status: 'success', payload });
        }catch(error){
            next(error)
        }
    };

    generateData = async(req, res, next) => {
        const pets = req.query.pets;
        const users = req.query.users;
        try{
            if(isNaN(pets) || isNaN(users)){
                throw new CustomError(
                    "Los querys deben ser de tipo number",
                    ListErrors.INVALID_TYPES_ERROR,
                    {   
                        campo: "query", 
                        detalle: "Los querys deben ser de tipo number",
                    }
                )
            }
        
            const Pets = await mockingPets(pets); 
            const Users = await mockingUsers(users, false);
            await petService.createPet(Pets);
            await userService.createUser(Users);

            const payload = {
                pets: await petService.getPets(),
                users: await userService.getUsers()
            }
            res.send({ status: 'success', payload });
        }catch(error){
            next(error)
        }
    }
}