import mongoose from "mongoose";
import {Schema} from 'mongoose';

const ArticleSchema = new Schema({
    writer: {type: Schema.Types.String, ref: 'Usuario', required: false},
    title: String,
    theme: String,
    content: String,
    publicationDate: Date,
    presentationDate: Date
});

export default mongoose.model("Artigo", ArticleSchema);