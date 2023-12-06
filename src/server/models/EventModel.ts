import mongoose from "mongoose";
import {Schema} from 'mongoose';

const EventSchema = new Schema({
    name: String,
    description: String,
    theme: String,
    organizer: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    organizingCommitte: String,
    startDate: Date,
    endDate: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    location:  {
        type: {
          type: String, 
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        }
    },
    participants: [{type: Schema.Types.ObjectId, ref: 'Usuario'}],
    feedbacks: [{type: Schema.Types.ObjectId, ref: 'Feedback'}]
});

export default mongoose.model('Evento', EventSchema);