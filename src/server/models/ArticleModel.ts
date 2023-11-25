import { ArticleSchema } from "../schema/ArticleSchema";
import mongoose from "mongoose";


export default mongoose.model("Article", ArticleSchema);