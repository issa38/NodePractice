const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true,

});

//Defining the Model. The first is the singular name of the scheme.
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;