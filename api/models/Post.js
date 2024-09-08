const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Defining the Post Schema:
const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String, 
    author: {type: Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps: true,
});

// Creating the Model:
const PostModel = model('Post', PostSchema);
module.exports = PostModel;

