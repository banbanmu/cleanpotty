import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pottySchma = new Schema({
    timeCleaned: Date,
    location: [ Number ]
});

export default mongoose.model('Potty', pottySchma);