const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const bcrypt = require('bcryptjs');

// Defining the User Schema:
const UserSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // email pattern
    },
    password: {
        type: String, 
        required: true
    },
})


// Creating the Model
const UserModel = model('User', UserSchema);

module.exports = UserModel;