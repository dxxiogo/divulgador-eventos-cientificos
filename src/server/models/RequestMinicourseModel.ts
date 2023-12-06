import mongoose from "mongoose";
import {Schema} from 'mongoose';


const RequestMinicourseSchema = new Schema({
    subject: String,
    ministering: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    eventId: {type: Schema.Types.ObjectId, ref: 'Evento'}
})



export default mongoose.model('RequisicaoMinicurso', RequestMinicourseSchema);