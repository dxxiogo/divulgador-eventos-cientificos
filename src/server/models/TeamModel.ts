import mongoose, {Schema} from 'mongoose';


const TeamSchema = new Schema({
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'Usuario'}],
    idHackathon: {type: Schema.Types.ObjectId, ref: 'Hackathon'}
});

export default mongoose.model('Time', TeamSchema);