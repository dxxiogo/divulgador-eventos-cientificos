import mongoose from "mongoose";

import {Schema} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    age: Number,
    password: String,
    address: String,
    educationLevel: String,
    wantEmails: Boolean
})
export default mongoose.model("Usuario", UserSchema);