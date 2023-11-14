import {Schema} from 'mongoose';

export const TeamSchema = new Schema({
    id: Number,
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});