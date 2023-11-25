import {Schema} from 'mongoose';

export const ArticleSchema = new Schema({
    writer: {type: Schema.Types.String, ref: 'User', required: false},
    title: String,
    theme: String,
    content: String,
    publicationDate: Date,
    presentationDate: Date
});