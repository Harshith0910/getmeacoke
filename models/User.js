import mongoose from "mongoose";

const {Schema, model, } = mongoose;

const UserSchema = new Schema({ 
    name: { type: String},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    rzid: { type: String },
    rzsecret: { type: String },
    pfp: { type: String},
    cp: { type: String  }
});

export default  mongoose.models.User || model("User", UserSchema) ;