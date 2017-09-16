import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pottySchma = new Schema({
    timeCleaned: { type: Date, default: Date.now },
    location: [ Number ]
});

export default mongoose.model('Potty', pottySchma);