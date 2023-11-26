import {Schema} from 'mongoose';

export const UserSchema = new Schema({
    email: String,
    name: String,
    age: Number,
    password: String,
    address: String,
    educationLevel: String,
    wantEmails: Boolean
})