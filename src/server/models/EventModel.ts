import { EventSchema } from "../schema/EventSchema";
import mongoose from "mongoose";

export default mongoose.model('Evento', EventSchema);