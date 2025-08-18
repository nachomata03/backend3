import mongoose from "mongoose";

const collection = "Adoptions";

const schema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'pets'
    }
})

const adoptionModel = mongoose.model(collection,schema);

export default adoptionModel;