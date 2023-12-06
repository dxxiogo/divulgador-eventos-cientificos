import mongoose from "mongoose";
import {Schema} from 'mongoose';


const MinicourseSchema = new Schema({
    subject: String,
    ministering: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    registrants: [{type: Schema.Types.ObjectId, ref: 'Usuario'}],
    idEvent: {type: Schema.Types.ObjectId, ref: 'Evento'}
})

export const Minicourse = mongoose.model('Minicurso', MinicourseSchema);