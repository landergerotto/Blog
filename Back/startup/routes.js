const express = require('express');
const article = require('../src/routes/article');
const author = require('../src/routes/author')
const login = require('../src/routes/login');

module.exports = function (app) {
    app
        .use(express.json())
        .use('/api/article', article)
        .use('/api/author', author)
        .use('/api/login', login)
}