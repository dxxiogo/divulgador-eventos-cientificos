import {Schema} from 'mongoose';


export const MinicourseSchema = new Schema({
    id: Number,
    subject: String,
    ministering: {type: Schema.Types.ObjectId, ref: 'User'},
    registrants: [{type: Schema.Types.ObjectId, ref: 'User'}],
})