/* import { expect } from "chai";
import config from "../src/config/config.js";
import mongoose from "mongoose";
import { mockingUsers } from "../src/utils/moking.js";
import UsersDao from "../src/repository/dao/user.dao.js";


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

describe("Test unitarios para CRUD de usuarios.", function() {
    const usersDao = new UsersDao();


    afterEach(async () => {
        await mongoose.connection.collection("users").deleteMany({});
    })  


    it("Test 1: createUser recibe un objeto (array) y devuelve un objeto con _id ", async () => {
        const [user] = await mockingUsers(1);
        const result = await usersDao.createUser(user);
        expect(result).to.have.property("_id");
    });

    it("Test 2: getUsers no recibe argumentos y devuelve un objeto con usuarios. ", async () => {
        const users = await mockingUsers(3);
        for (const user of users) {
            await usersDao.createUser(user);
        }
        const result2 = await usersDao.getUsers();

        expect(result2).to.be.an("array");
        expect(result2.length).to.be.greaterThan(1);
        expect(result2[0]).to.have.property("_id");
    });
    
    it("Test 3: getUser recibe un _id y devuelve un usuario.", async () => {
        const [user] = await mockingUsers(1);
        const result = await usersDao.createUser(user);
        const result2 = await usersDao.getUser(result._id);
        expect(result2).to.have.property("_id");
    });

    it("Test 4: updateUser recibe un _id y un objeto (array) y devuelve un objeto con _id.", async () => {
        const [user] = await mockingUsers(1);
        const createdUser = await usersDao.createUser(user);

        const [user2] = await mockingUsers(1);
        await usersDao.updateUser(createdUser._id, user2);

        const updatedUser = await usersDao.getUser(createdUser._id);
        expect(updatedUser.first_name).to.be.equal(user2.first_name);
    });

    it("Test 5: deleteUser recibe un _id y devuelve un objeto con _id.", async () => {
        const [user] = await mockingUsers(1);
        const createdUser = await usersDao.createUser(user);
        await usersDao.deleteUser(createdUser._id);
        const result = await usersDao.getUser(createdUser._id);
        expect(result).to.be.null;
    });
}); */