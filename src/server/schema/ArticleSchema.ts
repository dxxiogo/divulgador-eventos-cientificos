import {Schema} from 'mongoose';

export const ArticleSchema = new Schema({
    id: Number,
    writer: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    theme: String,
    content: String,
    publicationDate: Date,
    presentationDate: Date
});