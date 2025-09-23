import { expect } from "chai";
import config from "../src/config/config.js";
import mongoose from "mongoose";
import { mockingPets } from "../src/utils/moking.js";
import PetsDao from "../src/repository/dao/pet.dao.js";


const { MONGO_URI } = config;


before(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "tdd-backen3",
        });
        console.log("Conectado a la base de datos.");
    } catch (error) {
        console.log(error);
    }
});

after(async () => {
    try {
        await mongoose.disconnect();
        console.log("Desconectado de la base de datos.");
    } catch (error) {
        console.error("Error al desconectar de la base de datos:", error);
    }
});

describe("Test unitarios para CRUD de mascotas.", function() {
    const petsDao = new PetsDao();


    afterEach(async () => {
        await mongoose.connection.collection("pets").deleteMany({});
    })  


    it("Test 1: createPet recibe un objeto (array) y devuelve un objeto con _id ", async () => {
        const [pet] = await mockingPets(1);
        const result = await petsDao.createPet(pet);
        expect(result).to.have.property("_id");
    });

    it("Test 2: getPets no recibe argumentos y devuelve un objeto con mascotas. ", async () => {
        const pets = await mockingPets(3);
        for (const pet of pets) {
            await petsDao.createPet(pet);
        }
        const result2 = await petsDao.getPets();

        expect(result2).to.be.an("array");
        expect(result2.length).to.be.greaterThan(1);
        expect(result2[0]).to.have.property("_id");
    });
    
    it("Test 3: getPet recibe un _id y devuelve una mascota.", async () => {
        const [pet] = await mockingPets(1);
        const result = await petsDao.createPet(pet);
        const result2 = await petsDao.getPet(result._id);
        expect(result2).to.have.property("_id");
    });

    it("Test 4: updatePet recibe un _id y un objeto (array) y devuelve un objeto con _id.", async () => {
        const [pet] = await mockingPets(1);
        const createdPet = await petsDao.createPet(pet);

        const [pet2] = await mockingPets(1);
        await petsDao.updatePet(createdPet._id, pet2);

        const updatedPet = await petsDao.getPet(createdPet._id);
        expect(updatedPet.name).to.be.equal(pet2.name);
    });

    it("Test 5: deletePet recibe un _id y devuelve un objeto con _id.", async () => {
        const [pet] = await mockingPets(1);
        const createdPet = await petsDao.createPet(pet);
        await petsDao.deletePet(createdPet._id);
        const result = await petsDao.getPet(createdPet._id);
        expect(result).to.be.null;
    });
});