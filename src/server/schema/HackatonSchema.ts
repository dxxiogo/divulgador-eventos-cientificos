import {Schema} from 'mongoose';

export const HackatonSchema = new Schema({
    id: Number,
    name: String,
    teams: [{type: Schema.Types.ObjectId, ref: 'Team'}]
});