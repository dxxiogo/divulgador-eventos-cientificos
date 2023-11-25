import {Schema} from 'mongoose';

export const HackatonSchema = new Schema({
    name: String,
    teams: [{type: Schema.Types.ObjectId, ref: 'Team'}]
});