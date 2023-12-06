import mongoose from "mongoose";
import {Schema} from 'mongoose';

export const ArticleSchema = new Schema({
    writer: {type: Schema.Types.String, ref: 'User', required: false},
    title: String,
    theme: String,
    content: String,
    fileContent: {
        data: {type: Buffer, required: false},
        contentType: {type: String, required: false}
    },
    publicationDate: Date,
    presentationDate: Date
});

export default mongoose.model("Artigo", ArticleSchema);