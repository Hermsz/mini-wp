const router = require('express').Router()
const user = require('./users')
const article = require('./articles')


router.use('/users', user)
router.use('/articles', article)


module.exports = router