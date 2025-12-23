import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type : String},
    email: {type: String },
    password:{type: String},
    preferences:[String]
})

const User = mongoose.model('Client' , userSchema);
export default User;