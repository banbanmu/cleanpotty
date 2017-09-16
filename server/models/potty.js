import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pottySchma = new Schema({
    timeCleaned: { type: Date, default: Date.now },
    lat: Number,
    lng: Number
});

export default mongoose.model('Potty', pottySchma);
