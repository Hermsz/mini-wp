require('dotenv').config()

const express = require('express')
const app = express()
const port = 4000
const routes = require('./routes')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ encoded: false }))
app.use(cors())

app.use('/', routes)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mini-wp', { useNewUrlParser : true })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})