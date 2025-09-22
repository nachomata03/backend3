import { expect } from "chai";
import config from "../src/config/config.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { mockingUsers, mockingPets } from "../src/utils/moking.js";
import app from "../src/app.js";

const { MONGO_URI, MODE } = config;

console.log(MONGO_URI, MODE);

mongoose.set("strictQuery", true);

const request = supertest(app); 


describe("Test funcionarios para CRUD de adopcion.", function() {
    
    before(async function() {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "tdd-backen3",
        });
        console.log("Conectado a la base de datos.");
    } catch (error) {
        console.log(error);
    }

    const users = await mockingUsers(1, false);

    this.user = Array.isArray(users) ? users[0] : users;
    this.pet = (await mockingPets(1))[0];

    console.log("mockingUsers devuelve:", this.user);
    console.log("mockingPets devuelve:", this.pet);
    
    this.cookie = null
    this.adoption = null
    });

    after(async () => {
        try {
            await mongoose.connection.collection("adoption").deleteMany({});
            console.log("adoption deleted")

            await mongoose.disconnect();
            console.log("Desconectado de la base de datos.");
        } catch (error) {
            console.error("Error al desconectar de la base de datos:", error);
        }
    });

    it("Test registro de usuario: debe poder registrar correctamente un usuario", async function() {
        const response = await request
            .post("/api/session/register")
            .send(this.user);

        expect(response.statusCode).to.be.equal(201);
        expect(response._body.response).to.have.property("_id")
        expect(mongoose.Types.ObjectId.isValid(response._body.response._id)).to.be.true;
    })

    it("Test login de usuario: debe poder loguear correctamente un usuario y obtener la cookie", async function () {
        const loginUser = {
            email: this.user.email,
            password: this.user.password
        }
        
        const result = await request
            .post("/api/session/login")
            .send(loginUser);

        const cookieResult = result.headers['set-cookie'];
        const cookieData = cookieResult[0].split("=");

        this.cookie ={
            name: cookieData[0],
            value: cookieData[1].split(";")[0]
        }

        expect(this.cookie.name).to.equal('access_token');
        expect(this.cookie.value).to.be.ok;
    })

    it("Test de creacion de mascota: debe poder crear correctamente una mascota", async function() {
        const response = await request
            .post("/api/pets/")
            .send(this.pet);
            
            this.pet = response._body.response 
            
            expect(response.statusCode).to.be.equal(201)    
            expect(response._body.response).to.have.property("_id")
            expect(mongoose.Types.ObjectId.isValid(response._body.response._id)).to.be.true;
    })

    it("Test de adopcion de mascota: el usuario registrado debe poder adoptar correctamente una mascota", async function() {
        const response = await request
            .post(`/api/adoptions/${this.pet._id}`)
            .set("Cookie", `${this.cookie.name}=${this.cookie.value}`);    
            
            console.log(response._body.response)

            this.adoption = response._body.response

        expect(response.statusCode).to.be.equal(201)
        expect(response._body.response).to.be.a("object")
        expect(mongoose.Types.ObjectId.isValid(response._body.response._id)).to.be.true;
    })

    it("Test de obtencion de adopcion: debe poder obtener correctamente una adopcion", async function() {
        const response = await request
            .get(`/api/adoptions/${this.adoption._id}`) 

            //console.log("Cuerpo de la respuesta del GET:", response._body); puedo ver la respuesta del error

        expect(response.statusCode).to.be.equal(200)
        expect(response._body.response).to.be.a("object")
        expect(mongoose.Types.ObjectId.isValid(response._body.response._id)).to.be.true;
    })

    it("Test de obtencion de adopciones: debe poder obtener correctamente todas las adopciones", async function() {
        const response = await request
            .get(`/api/adoptions/`)
            .set("Cookie", `${this.cookie.name}=${this.cookie.value}`);

        expect(response.statusCode).to.be.equal(200)
        expect(response._body.response).to.be.a("array")
    })

})