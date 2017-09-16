import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchma = new Schema({
    name: String,
    email: String,
    password: String,
    hash: String
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, 10);
};
  
userSchema.methods.validateHash = function(password){
    return bcrypt.compareSync(password, this.password);
};
  
export default mongoose.model('User', userSchema);  