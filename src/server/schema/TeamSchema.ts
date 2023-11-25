import {Schema} from 'mongoose';

export const TeamSchema = new Schema({
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});