const path = require('path');
const fs = require('fs')
const authorController = require('./AuthorController')
const Article = require('../model/article')
const User = require('../model/login');

class ArticleController {
    static createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(__dirname, '../logs', `logs-${timestamp}.txt`);
        const errorString = JSON.stringify(error.message)
        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err)
        })
    }
    static async create(req, res) {
        const { title, text, authorid } = req.body;

        if (!title || !text || !authorid)
            return res.status(400).send({ message: "os campos não podem estarem vazios " });
        if (title.length < 3)
            return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });
        if (text.length < 15)
            return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });

        try {
            const author = await authorController.getAuthor(authorid);
            const article = {
                title,
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }

            await Article.create(article)

            return res.status(201).send({ message: "Artigo criado com sucesso" })
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likeArticle(req, res) {

        const { artId } = req.params;
        const { userId } = req.body;

        if (!artId)
            return res.status(400).send({ message: "No article id provider" })

        if (!userId)
            return res.status(400).send({ message: "No user id provider" })

        try {
            const user = await User.findById(userId);
            const article = await Article.findById(artId);

            if (user.liked != null) {
                if (user.liked.includes(artId)) {
                    user.liked = user.liked.filter( (item) => item != artId )

                    await Article.findByIdAndUpdate({ _id: artId }, { likes: --article.likes })
                    await User.findByIdAndUpdate({ _id: userId }, { liked: user.liked })
                    return res.status(200).send();
                }
        }
            
            user.liked.push(artId)

            await Article.findByIdAndUpdate({ _id: artId }, { likes: ++article.likes })
            await User.findByIdAndUpdate({ _id: userId }, { liked: user.liked })

            return res.status(200).send();
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }
    }
}

module.exports = ArticleController;
