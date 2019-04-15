const Article = require('../models/article')

class ArticleController {

  static findAllArticle(req, res) {
    Article
      .find()
      .then(allArticles => {
        res.status(200).json(allArticles)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findArticleUser(req, res) {
    Article
      .find({
        user_id: req.authenticatedUser.id
      })
      .then(foundArticles => {
        res.status(200).json(foundArticles)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findOneArticle(req, res) {
    Article
      .findById(req.params.id)
      .then(foundArticle => {
        res.status(200).json(foundArticle)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createArticle(req, res) {

    Article
      .create({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag,
        created_at: new Date,
        featured_image: req.file.gcsUrl,
        user_id: req.authenticatedUser.id
      })
      .then(newArticle => {
        res.status(200).json(newArticle)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteArticle(req, res) {
    Article
      .findOneAndRemove({
        _id: req.params.id
      })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  } 

  static updateArticle(req, res) {
    Article
      .findByIdAndUpdate({
        _id: req.params.id
      }, {
        title: req.body.title,
        content: req.body.content,
        featured_image: req.file.gcsUrl
        
      })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ArticleController