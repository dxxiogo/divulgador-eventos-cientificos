import {Schema} from 'mongoose';

export const ScheduleSchema = new Schema({
    lectureTheme: [String],
    minicourses: [{type: Schema.Types.ObjectId, ref:'Minicourse'}],
    hackaton: {type: Schema.Types.ObjectId, ref: 'Hackaton'},
    articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
});