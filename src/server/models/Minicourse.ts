import { MinicourseSchema } from "../schema/MinicourseSchema";
import mongoose from "mongoose";

export const Minicourse = mongoose.model('Minicurso', MinicourseSchema);