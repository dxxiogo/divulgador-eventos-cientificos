import { EventSchema } from "../schema/EventSchema";
import mongoose from "mongoose";

export const Event = mongoose.model('Evento', EventSchema);