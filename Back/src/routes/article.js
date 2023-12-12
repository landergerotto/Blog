const express = require('express');
const ArticleController = require('../controller/ArticleController');
const CommentController = require('../controller/CommentController');
const route = express.Router();

route
    .post('/', ArticleController.create)
    .post('/like/:artId', ArticleController.likeArticle)
    .post('/dislike/:artId', ArticleController.likeArticle)
    .post('/comment/:id', CommentController.create)
    
module.exports = route;