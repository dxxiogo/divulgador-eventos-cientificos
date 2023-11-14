import {Schema} from 'mongoose';

export const FeedbackSchema = new Schema({
    id: Number,
    date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
});