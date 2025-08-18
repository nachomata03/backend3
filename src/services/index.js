import UsersService from "./user.service.js";
import PetService from "./pet.service.js";
import AdoptionService from "./adoption.service.js";

export const userService = new UsersService();
export const petService = new PetService();
export const adoptionService = new AdoptionService();