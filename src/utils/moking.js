import { faker } from "@faker-js/faker";
import { createHash } from "./utils.js";

export const mockingUsers = async(num) => {
    try{
        const user = [];
        for(let i = 0; i < num; i++){
            user.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                password: faker.internet.password(),
                role: faker.helpers.arrayElement(["admin", "user"])
            })
    }
    return user
}catch(err){
        console.log(err);
    }
}

export const mockingPets = async(num) => {
    try{
        const pet = [];
        for(let i = 0; i < num; i++){
            pet.push({
                name: faker.animal.petName(),
                specie: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'hamster']),
                birthDate: faker.date.past(10),
                adopted: false
            })
        }
        return pet
    }catch(err){
        console.log(err);
    }
}