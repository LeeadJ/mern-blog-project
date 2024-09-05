const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Defining the User Schema:
const userSchema = new Schema({
    email: {
        type: String, 
        required: [true, "Your email address is required"],
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // email pattern
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String, 
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})


// Creating the Model
const UserModel = model('User', userSchema);

module.exports = UserModel;