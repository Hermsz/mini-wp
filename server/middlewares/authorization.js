const articleModel = require('../models/article')
module.exports = {
  userauthorization: function(req, res, next) {

    let userId = req.authenticatedUser.id
    let articleId = req.params.id

    articleModel
      .findById(articleId)
      .then(article => {
        if(article.user_id == userId) {
          next()
        } else {
          throw new Error('You are not authorized')
        }
      })
      .catch(err => {
        res.status(401).json(err.message)
      })
  }
}