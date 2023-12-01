import mongoose, { Schema } from "mongoose";

const HackathonSchema = new Schema({
    name: String,
    teams: [{type: Schema.Types.ObjectId, ref: 'Time'}]
});

export default mongoose.model('Hackathon',  HackathonSchema);