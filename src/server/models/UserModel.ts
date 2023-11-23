import { UserSchema } from "../schema/UserSchema";
import mongoose from "mongoose";


export default mongoose.model("User", UserSchema);