import mongoose, { Schema } from "mongoose";

const HackathonSchema = new Schema({
    name: String,
    teams: [{type: Schema.Types.ObjectId, ref: 'Time'}],
    idEvent: {type: Schema.Types.ObjectId, ref: 'Evento'}
});

export default mongoose.model('Hackathon',  HackathonSchema);