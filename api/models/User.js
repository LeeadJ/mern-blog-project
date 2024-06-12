const mongoose = require('mongoose');

// Defining the Schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true},
})

// Creating the Model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;