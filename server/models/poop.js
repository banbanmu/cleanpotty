import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const poopSchma = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    potty: { type: Schema.Types.ObjectId, ref: 'Potty' },
    timeSpent: Number,
    type: String,
});

export default mongoose.model('Poop', poopSchma);