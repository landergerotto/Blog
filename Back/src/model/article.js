const mongoose = require('mongoose');
const { authorSchema } = require('./authors');
const { commentSchema } = require('./comment');


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    text: {
        type: String,
        required: true,
        minlength: 15
    },
    author: {
        type: authorSchema,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    comments: [{
        type: commentSchema,
        required: false
    }],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    removedAt: {
        type: Date,
        required: false
    },
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
exports.articleSchema = articleSchema;
