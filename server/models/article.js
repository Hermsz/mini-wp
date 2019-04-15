const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // tag: {
  //   type: String
  // },
  created_at: {
    type: Date,
    required: true
  },
  featured_image: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article