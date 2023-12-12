const path = require('path');
const fs = require('fs')
const authorController = require('./AuthorController')
const Article = require('../model/article')
const User = require('../model/login');
const { Comment } = require('../model/comment');
const ArticleController = require('./ArticleController');


class CommentController {

    static createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(__dirname, '../logs', `logs-${timestamp}.txt`);
        const errorString = JSON.stringify(error.message)
        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err)
        })
    }

    static async create(req, res) {
        const { id } = req.params;
        const { text, authorid } = req.body;

        if (!text || !authorid)
            return res.status(400).send({ message: "Os campos não podem estar vazios." });
        if (text.length < 1)
            return res.status(400).send({ message: "o comentário não pode ser menor que 1 caractere" });

        try {
            const author = await authorController.getAuthor(authorid);
            const article = await ArticleController.getArticle(id)

            const comment = {
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }

            await Comment.create(comment)
            article.comments.push(comment)

            await Article.findByIdAndUpdate({ _id: id }, { comments: article.comments })


            return res.status(201).send({ message: "Comentário criado com sucesso" })
        } catch (error) {
            CommentController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };
}

module.exports = CommentController;
