import mongoose from "mongoose";
import {Schema} from 'mongoose';

const FeedbackSchema = new Schema({
    date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    content: String,
    idEvent: {type: Schema.Types.ObjectId, ref: 'Evento'}
});

export default mongoose.model("Feedback", FeedbackSchema);