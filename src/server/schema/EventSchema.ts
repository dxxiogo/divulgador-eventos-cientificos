import {Schema} from 'mongoose';

export const EventSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    theme: String,
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
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
    feedbacks: [{type: Schema.Types.ObjectId, ref: 'Feedback'}]
});