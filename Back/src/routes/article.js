const express = require('express');
const ArticleController = require('../controller/ArticleController');
const route = express.Router();

route
    .post('/', ArticleController.create)
    .post('/like/:artId', ArticleController.likeArticle)
    .post('/dislike/:artId', ArticleController.likeArticle)

    
module.exports = route;