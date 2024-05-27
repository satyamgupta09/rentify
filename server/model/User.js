const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ['buyer', 'seller'] },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
