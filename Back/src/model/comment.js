const mongoose = require('mongoose');
const { authorSchema } = require('./authors');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    author: {
        type: authorSchema,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
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

const Comment = mongoose.model('Comment', commentSchema);

exports.Comment = Comment
exports.commentSchema = commentSchema;
